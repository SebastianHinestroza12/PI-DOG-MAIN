const { Router } = require('express');
const router = Router();
const {
  getDogs,
  getDogsId,
  getTemperamento,
  postDogs,
  deleteDb,
  update

} = require('./../controllers/RutasController');


router.get('/dogs', getDogs);
router.get('/dogs/:id', getDogsId);
router.get('/temperaments', getTemperamento);
router.post('/dogs', postDogs);
router.delete('/dogs/:id', deleteDb);
router.put('/dogs', update)

module.exports = router;
