# spike-auth-server

This is the back end repo!

https://spike-auth-server.onrender.com/

See here to create a local mongodb instance for testing.

https://www.mongodb.com/docs/manual/administration/install-community/

Make sure the access token in tests/access-token.js is up to date.

## Locations/:id data guide:

Returns an object with 4 keys:

### swims

An array of user swims in this location.
Contains all normal swim data along with information about the user: `uid`, `nickname`, `name`, and `profileImg`

### userData

A set of averages based on all the above user swims.

- `avStars` is average stars out of 5
- `outOfDepth` is the overall consensus on whether the water is in places deeper than average standing height
- `avMins` the average mins people spend swimming
- `avKms` the average distance people swim
- `mostRecentTemp` the last recorded temperature by a user, including date. If this field is **null**, then ignore. Means there are no recorded temps.
- `feelTemps` is a percentage breakdown of what people describe the temperature as. Values will be one of: "freezing", "cold", "average", "warm", or "hot". This measure only includes swims within a month of the current time (so 'freezing' swims in winter to not affect results during 'warm' summer time).
- `sizes` is a percentage breakdown of size enums: "tiny", "small", "medium" and "large"
- `shores` is a percentage breakdown of shore enums: "muddy", "rocky", "sandy", "pebbly", "grassy" and "swampy"
- `bankAngles` is a breakdown of bank angle enums: "shallow", "medium", "steep" and "jump-in". Could maybe rename this 'entry' on the front end?
- `clarities` is a breakdown of clarity enums: "muddy", "murky", "average", "clear" and "perfect"

### location

Repeats basic info about the location including `name`, `type`, `coords` and `_id`

### apiData

This object can take two forms - one for **sea** data and one for **lake/pond/river** data.

#### Sea Data

Returns 4 keys:

- `tempCelsius`: the expected water temperature
- `nearestAab`: the nearest location of a government 'advice against bathing' warning. Includes a key of `name` and `distanceKm`.
- `waveData`: object with keys `maxWave` and `maxWavePeriod`.
- `weather`: an object representing the given day's weather. Use the `values` key not `units` for the actual data.
- `tides`: an object containing two arrays of high and low tides for the given day. This is **not** accurate, round to the nearest hour or half hour. Be careful with British Summer Time as the current values all seem to be off by an hour.

#### Lake/Pond/River Data

Returns 3 keys:

- `nearestAab`: same as above
- `weather`: same as above
- `hydrology`: an object containing 5 keys:
  - `name`: the name of the test site
  - `siteId`: id of the test site
  - `coords`: coords of the test site
  - `nearby`: a list of other nearby test sites. If we have time, these could be displayed with links (endpoint tbc). Something like: 'Not what you were looking for? Try these nearby places.'
  - `data`: an array of measurements of specific **determinands**. Could be any number of the following, but usually temperature and oxygen saturation are reliable:
    - **temperature** (determinandID = 0076). This object has the key `maxSurfaceTemp` which you should use for estimating water temperature. Units are degrees celsius.
    - **oxygen saturation** (determinandID = 9901). This object has the key `mostRecentValue` which you should use. Units are %. Not entirely sure yet how to correlate this with water quality - perhaps needs cross referencing with water temperature at the time of measurement (a backend job).
    - **streptococci** (determinandID = 6423). Bacteria per 100ml. This object has the key `mostRecentValue` which you should use. I assume the less of these the better?
    - **coliforms** (determinandID = 3461). Bacterial per 100ml. This object has the key `mostRecentValue` which you should use. Less is probably good.
    - **turbidity** (determinandID = 6396). This measure is effectively transparency, with specialist units Ntu. The object has the key `mostRecentValue` which you should use.
    - **suspended solids** (determinandID = 0135). Units mg per Litre. This object has the key `mostRecentValue` which you should use. Again, presumbaly the fewer the better?

Often **only temperature and oxygen saturation** data will be present in this array of determinands, the other values being null.

## Example response for a 'sea' location

```
{
  swims: [],
  userData: {
    avStars: null,
    outOfDepth: true,
    avMins: null,
    avKms: null,
    mostRecentTemp: {
      date: "0001-01-01T00:00:00.000Z",
      temp: null,
    },
    feelTemps: {},
    sizes: {},
    shores: {},
    bankAngles: {},
    clarities: {},
  },
  location: {
    _id: "650bfa752922d358b8c5656a",
    name: "Walpole Bay Tidal Pool, Margate",
    type: "sea",
    coords: [51.388631888089755, 1.3796788791465624],
    createdAt: "2023-09-21T08:10:29.265Z",
    updatedAt: "2023-09-21T08:10:29.265Z",
    __v: 0,
  },
  apiData: {
    tempCelsius: "18.6",
    nearestAab: {
      name: "Hastings Pelham Beach",
      distanceKm: 81.3,
    },
    waveData: {
      maxWave: "0.62m",
      maxWavePeriod: "4s",
    },
    weather: {
      units: {
        wdir: {
          id: "wdir",
          name: "Wind Direction",
          type: 2,
          unit: null,
        },
        uvindex: {
          id: "uvindex",
          name: "weather_uvindex",
          type: 2,
          unit: null,
        },
        latitude: {
          id: "latitude",
          name: "Latitude",
          type: 2,
          unit: null,
        },
        preciptype: {
          id: "preciptype",
          name: "weather_preciptype",
          type: 1,
          unit: null,
        },
        cin: {
          id: "cin",
          name: "weather_cin",
          type: 2,
          unit: null,
        },
        cloudcover: {
          id: "cloudcover",
          name: "Cloud Cover",
          type: 2,
          unit: null,
        },
        pop: {
          id: "pop",
          name: "Chance Precipitation (%)",
          type: 2,
          unit: null,
        },
        mint: {
          id: "mint",
          name: "Minimum Temperature",
          type: 2,
          unit: "degC",
        },
        datetime: {
          id: "datetime",
          name: "Date time",
          type: 3,
          unit: null,
        },
        precip: {
          id: "precip",
          name: "Precipitation",
          type: 2,
          unit: "mm",
        },
        solarradiation: {
          id: "solarradiation",
          name: "Solar Radiation",
          type: 2,
          unit: null,
        },
        dew: {
          id: "dew",
          name: "Dew Point",
          type: 2,
          unit: "degc",
        },
        humidity: {
          id: "humidity",
          name: "Relative Humidity",
          type: 2,
          unit: null,
        },
        longitude: {
          id: "longitude",
          name: "Longitude",
          type: 2,
          unit: null,
        },
        temp: {
          id: "temp",
          name: "Temperature",
          type: 2,
          unit: "degc",
        },
        address: {
          id: "address",
          name: "Address",
          type: 1,
          unit: null,
        },
        maxt: {
          id: "maxt",
          name: "Maximum Temperature",
          type: 2,
          unit: "degC",
        },
        visibility: {
          id: "visibility",
          name: "Visibility",
          type: 2,
          unit: "mi",
        },
        wspd: {
          id: "wspd",
          name: "Wind Speed",
          type: 2,
          unit: "mph",
        },
        severerisk: {
          id: "severerisk",
          name: "weather_severerisk",
          type: 2,
          unit: null,
        },
        solarenergy: {
          id: "solarenergy",
          name: "Solar Energy",
          type: 2,
          unit: null,
        },
        resolvedAddress: {
          id: "resolvedAddress",
          name: "Resolved Address",
          type: 1,
          unit: null,
        },
        heatindex: {
          id: "heatindex",
          name: "Heat Index",
          type: 2,
          unit: "degc",
        },
        snowdepth: {
          id: "snowdepth",
          name: "Snow Depth",
          type: 2,
          unit: "cm",
        },
        sealevelpressure: {
          id: "sealevelpressure",
          name: "Sea Level Pressure",
          type: 2,
          unit: "mb",
        },
        snow: {
          id: "snow",
          name: "Snow",
          type: 2,
          unit: "cm",
        },
        name: {
          id: "name",
          name: "Name",
          type: 1,
          unit: null,
        },
        wgust: {
          id: "wgust",
          name: "Wind Gust",
          type: 2,
          unit: "mph",
        },
        conditions: {
          id: "conditions",
          name: "Conditions",
          type: 1,
          unit: null,
        },
        windchill: {
          id: "windchill",
          name: "Wind Chill",
          type: 2,
          unit: "degc",
        },
        cape: {
          id: "cape",
          name: "weather_cape",
          type: 2,
          unit: null,
        },
      },
      values: {
        wdir: 199.8,
        uvindex: 0.4,
        datetimeStr: "2023-09-27T00:00:00+01:00",
        preciptype: "",
        cin: -15.2,
        cloudcover: 87.5,
        pop: 38.1,
        mint: 15.7,
        datetime: 1695772800000,
        precip: 2.8,
        solarradiation: 42.1,
        dew: 13.6,
        humidity: 79.2,
        temp: 17.3,
        maxt: 18.6,
        visibility: 15,
        wspd: 23.5,
        severerisk: 9.7,
        solarenergy: 0.2,
        heatindex: null,
        snowdepth: null,
        sealevelpressure: 1008.7,
        snow: 0,
        wgust: 38.3,
        conditions: "Overcast",
        windchill: null,
        cape: 21.7,
      },
    },
    tides: {
      highTides: ["2023-09-27T11:27:30.000Z", "2023-09-27T23:52:30.000Z"],
      lowTides: ["2023-09-27T05:15:00.000Z", "2023-09-27T17:40:00.000Z"],
    },
  },
};

```

## Example response for a 'pond', 'lake', or 'river' location

```
{
  swims: [
    {
      date: "2023-09-02T11:00:00.000Z",
      location: {
        name: "Rydal, Lake District",
        id: "650bfa752922d358b8c56564",
        _id: "650bfa762922d358b8c5657c",
      },
      notes:
        "A great swim! To the dog's grave on the main island and back. Water not too cold.",
      stars: 5,
      recordTemp: null,
      feelTemp: "average",
      mins: 45,
      km: 1,
      outOfDepth: true,
      sizeKey: "large",
      shore: "muddy",
      bankAngle: "medium",
      clarity: "average",
      imgUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/b/b4/Cumbria_2007_035.jpg",
      ],
      _id: "650bfa762922d358b8c5657b",
      uid: "QyqF2JQjSEY6TOqDvdaSAd99WyA2",
      name: "Test",
      nickname: "The Tester",
      profileImg:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Mad_scientist_transparent_background.svg/1200px-Mad_scientist_transparent_background.svg.png",
    },
    {
      date: "2023-06-21T17:00:00.000Z",
      location: {
        name: "Rydal, Lake District",
        id: "650bfa752922d358b8c56564",
        _id: "650bfa762922d358b8c56583",
      },
      notes: "Good fun",
      stars: 4,
      recordTemp: null,
      feelTemp: "average",
      mins: 25,
      km: 0.5,
      outOfDepth: true,
      sizeKey: "large",
      shore: "pebbly",
      bankAngle: "medium",
      clarity: "average",
      imgUrls: [
        "https://www.parkcliffe.co.uk/wp-content/uploads/2023/01/rydal-water-2-lake-district.jpg",
        "https://www.ratedtrips.com/images/styles/rt_slider/public/00008881_A3.jpg?itok=3BSnVDBP",
        "https://windows10spotlight.com/wp-content/uploads/2022/06/5cc14463fca6e0211691ddf32779fbf2.jpg",
      ],
      _id: "650bfa762922d358b8c56582",
      uid: "UHaKMQx4MLbrELny74UYMyUBcOm2",
      name: "testUser",
      nickname: "tester",
      profileImg:
        "https://upload.wikimedia.org/wikipedia/commons/a/a7/40._Schwimmzonen-_und_Mastersmeeting_Enns_2017_100m_Brust_Herren_USC_Traun-9897.jpg",
    },
    {
      date: "2023-05-07T17:00:00.000Z",
      location: {
        name: "Rydal, Lake District",
        id: "650bfa752922d358b8c56564",
        _id: "650bfa762922d358b8c5657e",
      },
      notes: "Pretty cold! Would recommend a wet suit...",
      stars: 4,
      recordTemp: null,
      feelTemp: "freezing",
      mins: 5,
      km: 0.1,
      outOfDepth: true,
      sizeKey: "large",
      shore: "grassy",
      bankAngle: "medium",
      clarity: "average",
      imgUrls: [
        "https://files.holidaycottages.co.uk/docs/lakelandcottagecompany/RW1resize.jpg",
      ],
      _id: "650bfa762922d358b8c5657d",
      uid: "QyqF2JQjSEY6TOqDvdaSAd99WyA2",
      name: "Test",
      nickname: "The Tester",
      profileImg:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Mad_scientist_transparent_background.svg/1200px-Mad_scientist_transparent_background.svg.png",
    },
  ],
  userData: {
    avStars: 4.33,
    outOfDepth: true,
    avMins: 25,
    avKms: 0.53,
    mostRecentTemp: {
      date: "0001-01-01T00:00:00.000Z",
      temp: null,
    },
    feelTemps: {
      average: "100%",
    },
    sizes: {
      large: "100%",
    },
    shores: {
      muddy: "33%",
      pebbly: "33%",
      grassy: "33%",
    },
    bankAngles: {
      medium: "100%",
    },
    clarities: {
      average: "100%",
    },
  },
  location: {
    _id: "650bfa752922d358b8c56564",
    name: "Rydal, Lake District",
    type: "lake",
    coords: [54.447268, -2.995986],
    createdAt: "2023-09-21T08:10:29.264Z",
    updatedAt: "2023-09-21T08:10:29.264Z",
    __v: 0,
  },
  apiData: {
    hydrologyData: {
      name: "RYDAL WATER (IFE DATA)",
      siteId: "NW-88010145",
      coords: [54.448023, -2.991569],
      nearby: [
        {
          name: "RYDAL WATER - LAKES TOUR",
          siteId: "NW-88022562",
          coords: [54.448023, -2.991569],
        },
        {
          name: "GRASMERE WFD STILLWATER MONITORING POINT",
          siteId: "NW-88016103",
          coords: [54.448893, -3.018795],
        },
        {
          name: "GRASMERE - LAKES TOUR",
          siteId: "NW-88022549",
          coords: [54.449563, -3.022451],
        },
        {
          name: "GRASMERE",
          siteId: "NW-88010010",
          coords: [54.450435, -3.025557],
        },
        {
          name: "GRASMERE LAKE BUOY 1",
          siteId: "NW-88016109",
          coords: [54.452961, -3.024525],
        },
        {
          name: "LOUGHRIGG TARN (IFE DATA)",
          siteId: "NW-88010147",
          coords: [54.430771, -3.012734],
        },
        {
          name: "LOUGHRIGG TARN - LAKES TOUR",
          siteId: "NW-88022561",
          coords: [54.430959, -3.013925],
        },
        {
          name: "ELTER WATER (WFD STILLWATER SITE)",
          siteId: "NW-88021662",
          coords: [54.42739, -3.022515],
        },
        {
          name: "ELTERWATER  (OUTER BASIN)",
          siteId: "NW-88021671",
          coords: [54.427971, -3.024996],
        },
        {
          name: "ELTERWATER (MIDDLE BASIN)",
          siteId: "NW-88021670",
          coords: [54.428739, -3.029886],
        },
        {
          name: "ELTERWATER  (INNER BASIN)",
          siteId: "NW-88010013",
          coords: [54.429231, -3.035325],
        },
        {
          name: "ELTERWATER - LAKES TOUR",
          siteId: "NW-88022547",
          coords: [54.428778, -3.035807],
        },
        {
          name: "BORRANS PARK BATHING WATER",
          siteId: "NW-88022428",
          coords: [54.421278, -2.964722],
        },
        {
          name: "LAKE WINDERMERE AT LOW WOOD WATERSPORTS",
          siteId: "NW-88021740",
          coords: [54.40969, -2.949305],
        },
        {
          name: "WINDERMERE LOW WRAY BAY",
          siteId: "NW-88024700",
          coords: [54.402966, -2.962999],
        },
        {
          name: "LAKE WINDERMERE AT WHITE CROSS BAY",
          siteId: "NW-88021737",
          coords: [54.481972, -2.938214],
        },
        {
          name: "BLELHAM TARN",
          siteId: "NW-88016157",
          coords: [54.397503, -2.975147],
        },
        {
          name: "BLELHAM TARN - LAKES TOUR",
          siteId: "NW-88022559",
          coords: [54.396905, -2.978013],
        },
        {
          name: "WINDERMERE NORTH - LAKES TOUR",
          siteId: "NW-88022553",
          coords: [54.400672, -2.956537],
        },
        {
          name: "WINDERMERE NORTH BASIN WFD",
          siteId: "NW-88022315",
          coords: [54.400703, -2.95606],
        },
        {
          name: "GRISEDALE TARN (WFD STILLWATER SITE)",
          siteId: "NW-88021914",
          coords: [54.500687, -3.002726],
        },
        {
          name: "WINDERMERE AT BROCKHOLE",
          siteId: "NW-88024706",
          coords: [54.398497, -2.943948],
        },
        {
          name: "WINDERMERE NORTH BASIN",
          siteId: "NW-88016097",
          coords: [54.396225, -2.947238],
        },
        {
          name: "BLEA TARN (WFD STILLWATER SITE)",
          siteId: "NW-88021915",
          coords: [54.429095, -3.091617],
        },
        {
          name: "WINDERMERE AT RED NAB CAR PARK",
          siteId: "NW-88024708",
          coords: [54.386957, -2.947409],
        },
        {
          name: "BROTHERSWATER",
          siteId: "NW-88010024",
          coords: [54.504914, -2.92447],
        },
        {
          name: "BROTHERSWATER - LAKES TOUR",
          siteId: "NW-88022545",
          coords: [54.50607, -2.925021],
        },
        {
          name: "ESTHWAITE WATER NORTH OF THE NAB",
          siteId: "NW-88024697",
          coords: [54.368291, -2.989831],
        },
        {
          name: "WINDERMERE AT MILLER GROUND (45650)",
          siteId: "NW-88004538",
          coords: [54.380706, -2.922538],
        },
        {
          name: "ESTHWAITE WATER @ SITE 'A' (NORTH BASIN)",
          siteId: "NW-88004550",
          coords: [54.365409, -2.987345],
        },
        {
          name: "RED TARN (WFD STILLWATER SITE)",
          siteId: "NW-88021913",
          coords: [54.529599, -3.005907],
        },
        {
          name: "ESTHWAITE WATER - LAKES TOUR",
          siteId: "NW-88022557",
          coords: [54.362671, -2.987972],
        },
        {
          name: "ESTHWAITE WATER AT WATERSIDE WOODS",
          siteId: "NW-88024645",
          coords: [54.362189, -2.98319],
        },
        {
          name: "THIRLMERE (IFE DATA)",
          siteId: "NW-88010144",
          coords: [54.529268, -3.055348],
        },
        {
          name: "THIRLMERE - LAKES TOUR",
          siteId: "NW-88022563",
          coords: [54.529268, -3.055348],
        },
        {
          name: "WINDERMERE WEST SHORE BATHING WATER",
          siteId: "NW-88022427",
          coords: [54.360333, -2.943288],
        },
        {
          name: "CONISTON WATER AT THE GONDOLA JETTY",
          siteId: "NW-88010778",
          coords: [54.363787, -3.068029],
        },
      ],
      data: [
        {
          determinandID: "0076",
          mostRecentValue: 13.2,
          mostRecentSampleDate: "2000-10-03T09:20:00",
          determinand: "Temperature of Water",
          units: "cel",
          samples: 4,
          sampleSpread: {
            winter: 1,
            spring: 1,
            summer: 1,
            autumn: 1,
          },
          regression: 18.26648860770956,
          adjustedRegression: 18.266488607709732,
          dateMatchedValue: 13.2,
          dateMatchedSampleDate: "2000-10-03T09:20:00",
          maxSurfaceTemp: 18.3,
        },
        {
          determinandID: "9901",
          mostRecentValue: 88.5,
          mostRecentSampleDate: "2000-10-03T09:20:00",
          determinand: "Oxygen, Dissolved, % Saturation",
          units: "%",
        },
        null,
        null,
        null,
        null,
      ],
    },
    nearestAab: {
      name: "Haverigg",
      distanceKm: 34.42,
    },
    weather: {
      units: {
        wdir: {
          id: "wdir",
          name: "Wind Direction",
          type: 2,
          unit: null,
        },
        uvindex: {
          id: "uvindex",
          name: "weather_uvindex",
          type: 2,
          unit: null,
        },
        latitude: {
          id: "latitude",
          name: "Latitude",
          type: 2,
          unit: null,
        },
        preciptype: {
          id: "preciptype",
          name: "weather_preciptype",
          type: 1,
          unit: null,
        },
        cin: {
          id: "cin",
          name: "weather_cin",
          type: 2,
          unit: null,
        },
        cloudcover: {
          id: "cloudcover",
          name: "Cloud Cover",
          type: 2,
          unit: null,
        },
        pop: {
          id: "pop",
          name: "Chance Precipitation (%)",
          type: 2,
          unit: null,
        },
        mint: {
          id: "mint",
          name: "Minimum Temperature",
          type: 2,
          unit: "degC",
        },
        datetime: {
          id: "datetime",
          name: "Date time",
          type: 3,
          unit: null,
        },
        precip: {
          id: "precip",
          name: "Precipitation",
          type: 2,
          unit: "mm",
        },
        solarradiation: {
          id: "solarradiation",
          name: "Solar Radiation",
          type: 2,
          unit: null,
        },
        dew: {
          id: "dew",
          name: "Dew Point",
          type: 2,
          unit: "degc",
        },
        humidity: {
          id: "humidity",
          name: "Relative Humidity",
          type: 2,
          unit: null,
        },
        longitude: {
          id: "longitude",
          name: "Longitude",
          type: 2,
          unit: null,
        },
        temp: {
          id: "temp",
          name: "Temperature",
          type: 2,
          unit: "degc",
        },
        address: {
          id: "address",
          name: "Address",
          type: 1,
          unit: null,
        },
        maxt: {
          id: "maxt",
          name: "Maximum Temperature",
          type: 2,
          unit: "degC",
        },
        visibility: {
          id: "visibility",
          name: "Visibility",
          type: 2,
          unit: "mi",
        },
        wspd: {
          id: "wspd",
          name: "Wind Speed",
          type: 2,
          unit: "mph",
        },
        severerisk: {
          id: "severerisk",
          name: "weather_severerisk",
          type: 2,
          unit: null,
        },
        solarenergy: {
          id: "solarenergy",
          name: "Solar Energy",
          type: 2,
          unit: null,
        },
        resolvedAddress: {
          id: "resolvedAddress",
          name: "Resolved Address",
          type: 1,
          unit: null,
        },
        heatindex: {
          id: "heatindex",
          name: "Heat Index",
          type: 2,
          unit: "degc",
        },
        snowdepth: {
          id: "snowdepth",
          name: "Snow Depth",
          type: 2,
          unit: "cm",
        },
        sealevelpressure: {
          id: "sealevelpressure",
          name: "Sea Level Pressure",
          type: 2,
          unit: "mb",
        },
        snow: {
          id: "snow",
          name: "Snow",
          type: 2,
          unit: "cm",
        },
        name: {
          id: "name",
          name: "Name",
          type: 1,
          unit: null,
        },
        wgust: {
          id: "wgust",
          name: "Wind Gust",
          type: 2,
          unit: "mph",
        },
        conditions: {
          id: "conditions",
          name: "Conditions",
          type: 1,
          unit: null,
        },
        windchill: {
          id: "windchill",
          name: "Wind Chill",
          type: 2,
          unit: "degc",
        },
        cape: {
          id: "cape",
          name: "weather_cape",
          type: 2,
          unit: null,
        },
      },
      values: {
        wdir: 165,
        uvindex: 0,
        datetimeStr: "2023-09-24T00:00:00+01:00",
        preciptype: "",
        cin: -0.2,
        cloudcover: 100,
        pop: 100,
        mint: 10.4,
        datetime: 1695513600000,
        precip: 24.6,
        solarradiation: 4.7,
        dew: 12.1,
        humidity: 92.6,
        temp: 13.3,
        maxt: 15.6,
        visibility: 0.1,
        wspd: 9.8,
        severerisk: 10,
        solarenergy: 0,
        heatindex: null,
        snowdepth: 0,
        sealevelpressure: 1012.3,
        snow: 0,
        wgust: 34,
        conditions: "Rain, Overcast",
        windchill: 5.9,
        cape: 2.1,
      },
    },
  },
};

```
