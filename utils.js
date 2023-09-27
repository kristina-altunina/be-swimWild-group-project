const Users = require("./models/users-model");

function processUserData(swims) {
  let outOfDepth = null;
  const mostRecentTemp = { date: null, temp: null };
  const feelTemps = [];
  const sizes = [];
  const shores = [];
  const bankAngles = [];
  const clarities = [];

  const avStars = trackAndAverage();
  const avMins = trackAndAverage();
  const avKms = trackAndAverage();

  if (Array.isArray(swims)) {
    swims.forEach((swim) => {
      avStars.add(swim.stars);
      avMins.add(swim.mins);
      avKms.add(swim.km);
      if (swim.outOfDepth && outOfDepth === null) outOfDepth = 0;
      if (typeof swim.outOfDepth === "boolean") {
        outOfDepth += swim.outOfDepth ? 1 : -1;
      }
      if (swim.recordTemp && swim.date > mostRecentTemp.date) {
        mostRecentTemp.temp = swim.recordTemp;
        mostRecentTemp.date = swim.date;
      }
      if (swim.feelTemp && withinMonth(swim.date))
        feelTemps.push(swim.feelTemp);
      if (swim.sizeKey) sizes.push(swim.sizeKey);
      if (swim.shore) shores.push(swim.shore);
      if (swim.bankAngle) bankAngles.push(swim.bankAngle);
      if (swim.clarity) clarities.push(swim.clarity);
    });
  }

  if (outOfDepth !== null) outOfDepth = outOfDepth >= 0 ? true : false;

  return {
    avStars: avStars.getAverage(),
    outOfDepth,
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

function withinMonth(date) {
  const now = new Date().getTime();
  const givenTime = new Date(date).getTime();
  return Math.abs(now - givenTime) < 1000 * 60 * 60 * 24 * 7 * 4;
}

function getSwimsFromLocation(id) {
  return Users.find({ "swims.location.id": id }).then((users) => {
    const swims = [];
    users.forEach((user) => {
      swims.push(
        ...user.swims
          .filter((swim) => {
            return swim.location.id === id;
          })
          .map((swim) => {
            const newSwim = { ...swim.toObject() };
            newSwim.uid = user.uid;
            newSwim.name = user.name;
            newSwim.nickname = user.nickname;
            newSwim.profileImg = user.profileImg;
            return newSwim;
          })
      );
    });
    swims.sort((a, b) => {
      return b.date - a.date;
    });
    return swims;
  });
}

function addDistanceToLocation(location, [lat, long]) {
  const coords = location.coords.map((coord) => +coord);
  const km = distanceBetweenCoords([lat, long], coords);
  const newLocation = location.toObject();
  newLocation.distanceKm = km;
  return newLocation;
}

function addStarsToLocation(location) {
  return getSwimsFromLocation(location._id.toString()).then((swims) => {
    const newLocation = { ...location };
    const avStars = trackAndAverage();
    for (const swim of swims) avStars.add(swim.stars);
    newLocation.avStars = avStars.getAverage();
    return newLocation;
  });
}

function paginate(arr, limit, p) {
  return arr.slice((p - 1) * limit, p * limit);
}

function generateInfo(swims, userData, location, apiData, user) {
  let temp;
  const hazards = [];
  if (apiData.hydrologyData) {
    const data = apiData.hydrologyData.data;
    temp = data[0]?.maxSurfaceTemp;
    if (data[1]?.mostRecentValue < 80)
      hazards.push(
        `Oxygen saturation was measured at ${
          data[1]?.mostRecentValue
        }% on ${new Date(
          data[1]?.mostRecentSampleDate
        ).toDateString()}. This may suggest the water is less safe for swimming.`
      );
  } else temp = apiData?.tempCelsius;
  if (apiData.nearestAab.distanceKm < 10) {
    hazards.push(
      `A government Advice Against Bathing warning has been issued for ${apiData.nearestAab.name} which is ${apiData.nearestAab.distanceKm}km away.`
    );
  }
  let msg;
  switch (Math.floor(temp / 5)) {
    case 0:
      msg =
        "This water is extremely cold. Do not swim unless you have professional advice, assistance and equipment.";
      break;
    case 1:
      msg =
        "This water is very cold. Wetsuits should be worn with a thickness of 5-6mm. Strongly consider wearing gloves, boots, and a hood, and bringing a swim buoy. Swimming in water of this temperature is dangerous - only do so with proper training, assistance, and equipment.";
      break;
    case 2:
      msg =
        "This water is cold. You should consider wearing a wetsuit of 3-4mm thick for prolonged swims. Gloves and socks may make the experience more comfortable. Use a swim buoy for safety in deep water.";
      break;
    case 3:
      msg =
        "This water is of an average temperature. You may choose to wear a wetsuit of 2-3mm for prolonged exposure. Consider wearing shoes to protect your feet. Use a swim buoy for safety in deep water.";
      break;
    case 4:
      msg =
        "This water is warm, most will prefer to swim without a wetsuit, although you should consider wearing shoes to protect your feet against rocks and underwater objects. Use a swim buoy for safety in deep water.";
      break;
    case 5:
      msg =
        "This water is hot and may not cool you effectively. Be mindful for symptoms of heatsroke and stay hydrated. Use a swim buoy for safety in deep water.";
      break;
  }
  const disclaimer =
    "All wild swimming is dangerous and may result in death. SwimWild cannot verify the integrity of data taken from third parties and thus cannot guarantee your safety in the water. Take precautions and always follow local rules and advice.";
  const warnings = [
    "Many physiological factors affect how much cold an individual can withstand. Heuristics such as '1 minute for each degree celsius' have no scientific basis and may put you at risk.",
    "Always enter the water slowly to avoid cold shock responses. Take warming up afterwards seriously - ensure you own thick robes or towels and have warm, dry clothes to change into afterwards.",
    "Be aware that you will feel coldest 10-40 minutes after your swim as blood moves from the core back to the extremities. Pack food, water and hot drinks for afterwards.",
    "Muscles behave very differently in cold water and you should never presume to be able to swim long distances after training in warm water. Stay close to standing depth and remember that you always have to swim back!",
    "Learn to spot and avoid rip currents, which may sometimes appear to be calmer patches of water. If caught in a rip current, swim laterally and never fight the current or risk exhaustion. Shout for help!",
    "Never swim near weirs, waterfall edges, or other dangerous obstacles/formations that might cause strong currents. If local advice says don't swim, then don't swim!",
  ];
  return {
    msg,
    disclaimer,
    warnings,
    hazards,
  };
}

module.exports = {
  processUserData,
  distanceBetweenCoords,
  approxHoursFromNow,
  withinMonth,
  getSwimsFromLocation,
  addDistanceToLocation,
  addStarsToLocation,
  paginate,
  generateInfo,
};
