const db = require('../data/db-config.js');
const { select } = require('../data/db-config.js');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes').where({ id }).first();
}

function findSteps(id) {
  // SELECT sc.id, sc.scheme_name, st.step_number, st.instructions
  // FROM schemes as sc
  // JOIN steps AS st ON sc.id = st.scheme_id
  // WHERE sc.id = input ID
  // ORDER BY st.step_number
  return db('schemes as sc')
    .join('steps as st', 'st.scheme_id', 'sc.id')
    .select('sc.id', 'sc.scheme_name', 'st.step_number', 'st.instructions')
    .where('sc.id', id)
    .orderBy('st.step_number');
}

function add(scheme) {
  return db('schemes')
    .insert(scheme, 'id')
    .then(([id]) => {
      return findById(id);
    });
}

function update(changes, id) {
  return db('schemes')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db('schemes').where('id', Number(id)).del();
}
