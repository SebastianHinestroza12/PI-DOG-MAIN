const { Raza, Temperament } = require('../db');
const axios = require('axios');

/**
 * Toma los datos de la API y devuelve una matriz de objetos con los datos de la API.
 * @returns Una matriz de objetos.
 */

const getApiInfo = async () => {
  const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
  const infoApi = await apiUrl.data.map((el) => {
    const weightApi = el.weight.metric.split("-");
    const heightApi = el.height.metric.split("-");
    return {
      id: el.id,
      name: el.name,
      heightMin: parseInt(heightApi[0]) ? parseInt(heightApi[0]) : 54,
      heightMax: parseInt(heightApi[1]) ? parseInt(heightApi[1]) : 22,
      weightMin: parseInt(weightApi[0]) ? parseInt(weightApi[0]) : 14,
      weightMax: parseInt(weightApi[1]) ? parseInt(weightApi[1]) : 78,
      life_span: el.life_span,
      image: el.image.url
        ? el.image.url
        : "https://st.depositphotos.com/1806346/1944/i/600/depositphotos_19448879-stock-photo-three-dogs.jpg",
      temperament: el.temperament
    };
  });
  return infoApi;
};


/**
 * Quiero obtener todos los datos de la tabla Raza, pero también quiero obtener los datos de la tabla
 * Temperament, pero no quiero obtener los datos de la tabla Temperament_Dog.
 * @returns [
 *   {
 *     "id": 1,
 *     "name": "Dogo",
 *     "Temperaments": [
 *       {
 *         "name": "Fuerte"
 *       },
 *       {
 *         "name": "Agresivo"
 *       }
 *     ]
 */
const getInfoDb = async () => {
  return await Raza.findAll({
    include: {
      model: Temperament,
      attributes: ['name'],
      through: { attributes: [] }
    }
  })
};

/**
 * Toma datos de una API y una base de datos, y los combina en una matriz.
 * @returns Una matriz de objetos.
 */
const getAllInfo = async () => {
  const apiInfoAll = await getApiInfo();
  let dbInfo = await getInfoDb();
  dbInfo = await dbInfo.map((el) => {
    return {
      id: el.id,
      name: el.name,
      heightMin: el.heightMin,
      heightMax: el.heightMax,
      weightMin: el.weightMin,
      weightMax: el.weightMax,
      life_span: el.life_span,
      image: el.image
        ? el.image
        : "https://st.depositphotos.com/1806346/1944/i/600/depositphotos_19448879-stock-photo-three-dogs.jpg",
      temperament: el.temperaments.map(e => {
        return e.name
      }).join(", ")
    };
  });

  const infoTotal = apiInfoAll.concat(dbInfo);
  return infoTotal;
  // let merge = [...apiInfoAll, ...dbInfo];
  // return merge;
};

/**
 * Obtiene todos los Temperaments de la API, los formatea y luego los guarda en la base de datos.
 * @returns Una matriz de objetos.
 */
const getTemperamentAll = async () => {
  let temsApi = await axios.get("https://api.thedogapi.com/v1/breeds");
  let mapTems = await temsApi.data.map(
    (el) => el.temperament ? el.temperament : el.temperaments
  );
  mapTems = mapTems.join().split(",").sort();
  mapTems = [...new Set(mapTems)];
  const formatTemperaments = mapTems
    .map((e) => e.trim())
    .filter((e) => e !== "undefined");
  for (let i = 0; i < formatTemperaments.length; i++) {
    const e = formatTemperaments[i];
    await Temperament.findOrCreate({
      where: { name: e },
    });
  }
  let allTemperaments = await Temperament.findAll();
  return allTemperaments;
};


module.exports = {
  getApiInfo,
  getInfoDb,
  getAllInfo,
  getTemperamentAll
}