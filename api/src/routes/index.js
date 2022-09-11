const { Router } = require('express');
const router = Router();
const axios = require('axios');

router.get('/prueba', async (req, res) => {

  const api = await axios.get('https://api.thedogapi.com/v1/breeds');
  const resultado = await api.data
  return res.json(resultado);
});

module.exports = router;
