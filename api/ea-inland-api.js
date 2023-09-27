const axios = require("axios");
const {
  convertToDayOfYear,
  formatSite,
  calculateSeasonalSpread,
  expectedHydrologyTemp,
  getSurfaceResults,
} = require("./utils");
const PolynomialRegression = require("ml-regression-polynomial");
const { distanceBetweenCoords } = require("../utils");

const api = axios.create({
  baseURL: "http://eip.ceh.ac.uk/hydrology-ukscape",
});

function collectEaInlandData(
  coords,
  radiusMetres,
  type = "lakes",
  searchDate = new Date().toISOString(),
  station
) {
  let siteData;
  return findEaSites(coords, radiusMetres, type, station)
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
      //console.log(err?.response?.status);
      if (err?.response?.status === 404) {
        //console.log("404 at ", err.request.method, err.request.path);
      }
    });
}

function findEaSites(coords, radiusMetres, type, station) {
  // type can only be 'lakes' or 'rivers'
  return api
    .get(
      `/WQdataAvailability?latitude=${coords[0]}&longitude=${coords[1]}&distMetres=${radiusMetres}&determinands=0076&siteType=${type}`
    )
    .then(({ data }) => {
      // sort by distance
      const sites = data[type].sites;
      if (!sites.length) return Promise.reject();
      sites.sort((a, b) => {
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
      const output = formatSite(sites[station]);
      output.nearby = sites.map((site) => {
        return formatSite(site);
      });
      return output;
    })
    .catch((err) => {
      // console.log(err);
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
      data = getSurfaceResults(data);
      // most recent
      data.sort((a, b) => {
        return new Date(b.datetime) - new Date(a.datetime);
      });
      const mostRecent = data.find((sample) => sample.datetime <= searchDate);
      processedData.mostRecentValue = mostRecent.value;
      processedData.mostRecentSampleDate = mostRecent.datetime;
      processedData.determinand = mostRecent.determinand;
      processedData.units = data[0].units;

      if (detail.determinandID === "0076") {
        // polynomial regression
        const x = [];
        const y = [];
        const logs = [];
        for (const sample of data) {
          x.push(convertToDayOfYear(sample.datetime));
          y.push(sample.value);
          logs.push([convertToDayOfYear(sample.datetime), sample.value]);
        }
        processedData.logs = logs;
        const searchDay = convertToDayOfYear(searchDate);
        if (
          x.some((sample) => sample > searchDay) &&
          x.some((sample) => sample < searchDay)
        ) {
          const regression = new PolynomialRegression(x, y, 2);
          processedData.samples = x.length;
          processedData.sampleSpread = calculateSeasonalSpread(x);
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
        data.sort((a, b) => {
          const aThisYear = new Date(a.datetime).setFullYear(
            new Date().getFullYear()
          );
          const bThisYear = new Date(b.datetime).setFullYear(
            new Date().getFullYear()
          );
          return Math.abs(date - aThisYear) - Math.abs(date - bThisYear);
        });
        processedData.dateMatchedValue = data[0].value;
        processedData.dateMatchedSampleDate = data[0].datetime;
        processedData.maxSurfaceTemp =
          +expectedHydrologyTemp(processedData).toFixed(1);
        logs.sort((a, b) => a[0] - b[0]);
      }
      return processedData;
    })
    .catch((err) => {
      if (err?.response?.status === 404) {
        // console.log("404 at ", err.request.method, err.request.path);
      }
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
