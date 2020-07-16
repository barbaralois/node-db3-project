const db = require('../data/schemes.js');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};

function find() {
  // SELECT * FROM schemes
  return db('schemes');
}

function findById(id) {
  // SELECT * FROM schemes
  // WHERE schemes.id = 4
  return db('schemes').where({ id }).first();
}

// Not Finished Yet
function findSteps(id) {
  // SELECT sc.id, sc.scheme_name, st.step_number, st.instructions
  // FROM schemes as sc
  // JOIN steps AS st ON sc.id = st.scheme_id
  // WHERE sc.id = 3
  // ORDER BY st.step_number
  return db('schemes');
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

// Not Finished Yet
function remove(id) {}
