const { Router } = require('express');
const router = Router();
const {
  getDogs,
  getDogsId,
  getTemperamento,
  postDogs,
  deleteBd,
  updateDb


} = require('./../controllers/RutasController');


router.get('/dogs', getDogs);
router.get('/dogs/:id', getDogsId);
router.get('/temperaments', getTemperamento);
router.post('/dogs', postDogs);
router.delete('/dogs', deleteBd);
router.put('/dogs', updateDb);


module.exports = router;
