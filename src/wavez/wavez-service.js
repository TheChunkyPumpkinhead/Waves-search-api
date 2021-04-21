const WavezService = {

  getAllwavez(knex) {
    return knex.select('*').from('wavez');
  },
  //ASK MENTOR ABOUT THIS
  insertNote(knex, newWavez) {
    return knex
      .insert(newWavez)
      .into('wavez')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex
      .from('wavez_notes')
      .select('*')
      .where('id', id)
      .first();
  },

  deleteNote(knex, id) {
    return knex('wavez')
      .where({ id })
      .delete();
  },

  updateWavez(knex, id, newWavezFields) {
    return knex('wavez')
      .where({ id })
      .update(newWavezFields);
  }
};

module.exports = WavezService;