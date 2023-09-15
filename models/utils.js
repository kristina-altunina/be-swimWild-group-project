function addIdToLocations(locations, userData) {
  return userData.map((user) => {
    const swims = user.swims.map((swim) => {
      const locationID = locations.find((location) => {
        return location.name === swim.location.name;
      })._id;
      const newSwim = {...swim}
      newSwim.location.id = locationID
      return newSwim
    });
    const newUser = {...user}
    newUser.swims = swims
    return newUser
  });
}

module.exports = { addIdToLocations };
