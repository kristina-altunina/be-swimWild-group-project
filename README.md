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

A set of average
