# spike-auth-server

This is the back end repo!

https://spike-auth-server.onrender.com/

See here to create a local mongodb instance for testing.

https://www.mongodb.com/docs/manual/administration/install-community/

Make sure the access token in tests/access-token.js is up to date.

Swim locations need to be classed as "river", "lake/pond", or "sea".

## Locations/:id data guide:

Returns an object with 4 keys:

### swims

A list of user swims in this location.
Contains all normal swims data along with information about the user: uid, nickname. name, profileImg

### userData

A set of averages based on all the above swims.

- `avStars` is average stars out of 5
- `outOfDepth` is the overall consensus on whether the water is in places deeper than average standing height
- `avMins` the average mins people spend swimming
- `avKms` the average distance people swim
- `mostRecentTemp` the last recorded temperature by a user, including date. If this field is **null**, then ignore. Means there are no recorded temps.
- `feelTemps` a breakdown of what people describe the temperature as. There as enums: "freezing", "cold", "average", "warm", or "hot"
- `sizes` break down of size enums: "tiny", "small", "medium", "large"
- `shores` break of of shore enums: "muddy", "rocky", "sandy", "pebbly", "grassy", "swampy"
- `bankAngles` breakdown of bank angle enums: "shallow", "medium", "steep", "jump-in". Could rename this 'entry' no the front end?
- `clarities` breakdown of clarity enums: "muddy", "murky", "average", "clear", "perfect"

### location

Repeats basic info about the location: name, type, coords, \_id

### apiData

This object can take two forms - one for **sea** data and one for **lake/pond/river** data.

#### Sea Data
