const axios = require("axios");
const { convertToDayOfYear, formatSite } = require("./utils");
const PolynomialRegression = require("ml-regression-polynomial");
const { distanceBetweenCoords } = require("../utils");

const api = axios.create({
  baseURL: "http://eip.ceh.ac.uk/hydrology-ukscape",
});

function collectEaInlandData(
  coords,
  radiusMetres,
  type = "lakes",
  searchDate = new Date().toISOString()
) {
  let siteData;
  return findEaSites(coords, radiusMetres, type)
    .then((sites) => {
      siteData = sites;
      const eaData = getEaData(sites.siteId);
      const promises = [];
      for (let dataPoint in eaData) {
        promises.push(processEaData(eaData[dataPoint], searchDate));
      }
      return Promise.all(promises);
    })
    .then((dataSets) => {
      siteData.data = dataSets;
      return siteData;
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 404) {
        console.log("404 at ", err.request.method, err.request.path);
      }
    });
}

function findEaSites(coords, radiusMetres, type) {
  // type can only be 'lakes' or 'rivers'
  return api
    .get(
      `/WQdataAvailability?latitude=${coords[0]}&longitude=${coords[1]}&distMetres=${radiusMetres}&determinands=0076&siteType=${type}`
    )
    .then(({ data }) => {
      // sort by distance
      const sites = data[type].sites.toSorted((a, b) => {
        const distanceA = distanceBetweenCoords(coords, [
          a.properties.lat,
          a.properties.lon,
        ]);
        const distanceB = distanceBetweenCoords(coords, [
          b.properties.lat,
          b.properties.lon,
        ]);
        return distanceA - distanceB;
      });
      const output = formatSite(sites.shift());
      output.nearby = sites.map((site) => {
        return formatSite(site);
      });
      return output;
    })
    .catch((err) => {
      console.log(err);
    });
}

function getEaData(siteId) {
  return {
    temperatureCelsius: api.get(`/stations/EA/WQ/${siteId}?determinand=0076`),
    oxygenSaturationPercent: api.get(
      `/stations/EA/WQ/${siteId}?determinand=9901`
    ),
    streptococciPer100ml: api.get(`/stations/EA/WQ/${siteId}?determinand=6423`),
    coliformsPer100ml: api.get(`/stations/EA/WQ/${siteId}?determinand=3461`),
    turbidityNtu: api.get(`/stations/EA/WQ/${siteId}?determinand=6396`),
    solidsMgPerL: api.get(`/stations/EA/WQ/${siteId}?determinand=0135`),
  };
}

function processEaData(dataPromise, searchDate) {
  return dataPromise
    .then(({ data: { data, detail } }) => {
      const processedData = {
        determinandID: detail.determinandID,
      };
      // most recent
      const mostRecent = data
        .toSorted((a, b) => {
          return new Date(b.datetime) - new Date(a.datetime);
        })
        .find((sample) => sample.datetime <= searchDate);
      processedData.mostRecentValue = mostRecent.value;
      processedData.mostRecentSampleDate = mostRecent.datetime;
      processedData.determinand = mostRecent.determinand;
      processedData.units = data[0].units;

      if (detail.determinandID === "0076") {
        // polynomial regression
        const x = [];
        const y = [];
        for (const sample of data) {
          x.push(convertToDayOfYear(sample.datetime));
          y.push(sample.value);
        }
        const searchDay = convertToDayOfYear(searchDate);
        if (
          x.some((sample) => sample > searchDay) &&
          x.some((sample) => sample < searchDay)
        ) {
          const regression = new PolynomialRegression(x, y, 5);
          processedData.regression = regression.predict(searchDay);
          const mostRecentDay = convertToDayOfYear(mostRecent.datetime);
          const predictedValueOfMostRecentDay =
            regression.predict(mostRecentDay);
          const ratio = mostRecent.value / predictedValueOfMostRecentDay;
          const adjustedRegression = processedData.regression * ratio;
          processedData.adjustedRegression = adjustedRegression;
        }
        // date match
        const date = new Date(searchDate);
        const dateMatch = data.toSorted((a, b) => {
          const aThisYear = new Date(a.datetime).setFullYear(
            new Date().getFullYear()
          );
          const bThisYear = new Date(b.datetime).setFullYear(
            new Date().getFullYear()
          );
          return Math.abs(date - aThisYear) - Math.abs(date - bThisYear);
        })[0];
        processedData.dateMatchedValue = dateMatch.value;
        processedData.dateMatchedSampleDate = dateMatch.datetime;
      }
      return processedData;
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { collectEaInlandData };

// collectEaInlandData(
//   [54.2744, -2.9516],
//   1000,
//   "lakes",
//   new Date().toISOString()
// ).then((data) => {
//   console.log(data);
// });
