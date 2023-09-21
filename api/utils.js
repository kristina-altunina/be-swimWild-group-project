function convertToDayOfYear(datetime) {
  const monthLookup = {
    0: 0,
    1: 31,
    2: 59,
    3: 90,
    4: 120,
    5: 151,
    6: 181,
    7: 212,
    8: 243,
    9: 273,
    10: 304,
    11: 334,
  };
  const date = new Date(datetime);
  return monthLookup[date.getMonth()] + date.getDate();
}

function formatSite(site) {
  return {
    name: site.properties.site_name,
    siteId: site.properties.site_id,
    coords: [site.properties.lat, site.properties.lon],
  };
}

function removeSamplingPoint(name) {
  if (name.startsWith("Sampling point at ")) {
    return name.slice(18);
  } else return name;
}

function calculateSeasonalSpread(dates) {
  const winter = dates.filter((date) => {
    return date < 90 || date >= 334;
  }).length;
  const spring = dates.filter((date) => {
    return date >= 90 && date < 151;
  }).length;
  const summer = dates.filter((date) => {
    return date >= 151 && date < 273;
  }).length;
  const autumn = dates.filter((date) => {
    return date >= 273 && date < 334;
  }).length;
  return {
    winter,
    spring,
    summer,
    autumn,
  };
}

function expectedHydrologyTemp({
  dateMatchedValue,
  dateMatchedSampleDate,
  adjustedRegression,
  regression,
  sampleSpread,
  samples,
  mostRecentValue,
  mostRecentSampleDate,
}) {
  const weeks = 1000 * 60 * 60 * 24 * 7;
  // if within two weeks, send most recent sample
  if (
    new Date().getTime() - new Date(mostRecentSampleDate).getTime() <
    weeks * 2
  ) {
    return mostRecentValue;
  }
  if (!sampleSpread.winter || !sampleSpread.summer) {
    return dateMatchedValue;
  }
  if (
    new Date().getTime() - new Date(mostRecentSampleDate).getTime() <
    weeks * 8
  ) {
    return adjustedRegression;
  }
  return regression;
}

function getDay(datetime) {
  return Math.floor(new Date(datetime).getTime() / 1000 / 60 / 60 / 24);
}

function getSurfaceResults(data) {
  const days = [];
  const surfaceData = [];
  for (const sample of data) {
    if (days.includes(getDay(sample.datetime))) continue;
    days.push(getDay(sample.datetime));
    surfaceData.push(sample);
  }
  console.log(surfaceData);
  return surfaceData;
}

module.exports = {
  convertToDayOfYear,
  formatSite,
  removeSamplingPoint,
  calculateSeasonalSpread,
  expectedHydrologyTemp,
  getSurfaceResults,
};
