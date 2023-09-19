function distanceBetweenCoords(coords1, coords2) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(coords1[0] - coords2[0]);
  const dLon = deg2rad(coords1[1] - coords2[1]);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(coords1[0])) *
      Math.cos(deg2rad(coords2[0])) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return +d.toFixed(2);
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
