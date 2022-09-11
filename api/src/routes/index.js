const { Router } = require('express');
const router = Router();
const {
  getDogs,
  getDogsId,
  getTemperamento
} = require('./../controllers/RutasController');


router.get('/dogs', getDogs);
router.get('/dogs/:id', getDogsId);
router.get('/temperaments', getTemperamento);

module.exports = router;
