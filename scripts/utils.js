function distanceBetweenCoords(coords1, coords2) {
  const x = coords1[0] - coords2[0];
  const y = coords1[1] - coords2[1];
  return Math.sqrt(x ** 2 + y ** 2);
}

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

module.exports = {
  distanceBetweenCoords,
  convertToDayOfYear,
  formatSite,
  removeSamplingPoint,
};
