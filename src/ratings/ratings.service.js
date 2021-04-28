const RatingsService = {
  getAllRatings(db) {
    return db
      .select('*')
      .from('ratings');
  },
  getAllRatingsByLocId(db, loc_id) {
    return db('ratings')
      .select('location_id', db.raw('AVG(stars) as average_rating'))
      .where({ 'location_id': loc_id })
      .groupBy('location_id')
      .first();
  },
  insertNewRating(db, newRating) {
    return db
      .insert(newRating)
      .into('ratings')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  serializeRating(rating) {
    const { id, location_id, stars } = rating;
    return {
      id: id,
      location_id: location_id,
      stars: stars,
    };
  },
};
module.exports = RatingsService;