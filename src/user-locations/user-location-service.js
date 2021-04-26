const UserLocationService = {
  getAllLocations(db) {
    return db
      .select('*')
      .from('locations');
  },
  getLocationsById(db, loc_id) {
    return db
      .from('locations')
      .select('*')
      .where({ 'id': loc_id })
      .first();
  },
  getLocationsByUser(db, user_id) {
    return db
      .from('locations')
      .select('*')
      .join('user_locations', { "locations.id": 'user_locations.location_id' })
      .where({ 'user_locations.user_id': user_id });
  },
  insertUserLocation(db, newLoc) {
    return db
      .insert(newLoc)
      .into('user_locations')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

};

module.exports = UserLocationService;