const { Router } = require('express');
const router = Router();
const {
  getDogs,
  getDogsId,
  getTemperamento,
  postDogs,


} = require('./../controllers/RutasController');


router.get('/dogs', getDogs);
router.get('/dogs/:id', getDogsId);
router.get('/temperaments', getTemperamento);
router.post('/dogs', postDogs);


module.exports = router;
