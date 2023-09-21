function processUserData(swims) {
  let outOfDepth = 0;
  const mostRecentTemp = { date: "0001-01-01T00:00:00.000Z", temp: null };
  const feelTemps = [];
  const sizes = [];
  const shores = [];
  const bankAngles = [];
  const clarities = [];

  const avStars = trackAndAverage();
  const avMins = trackAndAverage();
  const avKms = trackAndAverage();

  swims.forEach((swim) => {
    avStars.add(swim.stars);
    avMins.add(swim.mins);
    avKms.add(swim.km);
    if (swim.outOfDepth !== null) outOfDepth += outOfDepth ? 1 : -1;
    if (swim.recordTemp && swim.date > mostRecentTemp.date) {
      mostRecentTemp.temp = swim.recordTemp;
    }
    if (swim.feelTemp) feelTemps.push(swim.feelTemp);
    if (swim.sizeKey) sizes.push(swim.sizeKey);
    if (swim.shore) shores.push(swim.shore);
    if (swim.bankAngle) bankAngles.push(swim.bankAngle);
    if (swim.clarity) clarities.push(swim.clarity);
  });

  return {
    avStars: avStars.getAverage(),
    outOfDepth: outOfDepth >= 0 ? true : false,
    avMins: avMins.getAverage(),
    avKms: avKms.getAverage(),
    mostRecentTemp: mostRecentTemp,
    feelTemps: summariseEnums(feelTemps),
    sizes: summariseEnums(sizes),
    shores: summariseEnums(shores),
    bankAngles: summariseEnums(bankAngles),
    clarities: summariseEnums(clarities),
  };
}

function summariseEnums(array) {
  const lookup = {};
  let count = 0;
  for (const item of array) {
    if (lookup[item]) lookup[item]++;
    else lookup[item] = 1;
    count++;
  }
  for (const key in lookup) {
    lookup[key] = ((lookup[key] / count) * 100).toFixed(0) + "%";
  }
  return lookup;
}

function trackAndAverage() {
  let count = 0;
  let total = 0;
  return {
    add: (value) => {
      if (!value) return;
      count++;
      total += value;
    },
    getAverage: () => {
      return +(total / count).toFixed(2);
    },
  };
}

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

function approxHoursFromNow(time) {
  const diff = time - new Date().getTime();
  return Math.round(diff / 1000 / 60 / 60);
}

module.exports = { processUserData, distanceBetweenCoords, approxHoursFromNow };
