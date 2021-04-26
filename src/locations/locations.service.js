function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}


const LocationService = {
  getAllLocations(db) {
    return db
      .select('*')
      .from('locations');
  },
  insertNewLocation(db, newLoc) {
    return db
      .insert(newLoc)
      .into('locations')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  // get items by keyword (filter) 
  getItemsByKeyword(db, key_word) {
    return db
      .from('locations')
      .select('*')
      .where('keyword', 'like', `%${key_word}%`)
      .orWhere('keyword', 'like', `%${key_word.toUpperCase()}%`)
      .orWhere('keyword', 'like', `%${titleCase(key_word)}%`);
  },
  // update location to save to acct 
  getLocationsById(db, loc_id) {
    return db
      .from('locations')
      .select('*')
      .where({ 'id': loc_id })
      .first();
  },
  updateLocation(db, location_id, newLocation) {
    return db('locations')
      .update(newLocation, returning = true)
      .where({
        id: location_id
      })
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  // save a public post to your account 
  getUsersById(db, user_id) {
    return db
      .from('locations')
      .select('*')
      .where({ 'id': user_id })
      .first();
  },
  updateLocationUser(db, user_id, newLocation) {
    return db('locations')
      .update(newLocation, returning = true)
      .where({
        id: user_id
      })
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
};

module.exports = LocationService; 