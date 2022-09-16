const { Raza, Temperament } = require('../db');
const axios = require('axios');

/**
 * Toma los datos de la API y devuelve una matriz de objetos con los datos de la API.
 * @returns Una matriz de objetos.
 */

const getApiInfo = async () => {
  const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
  const infoApi = await apiUrl.data.map((el) => {
    const heightAPI = el.height.metric.split("-");
    const weightAPI = el.weight.metric.split("-");
    return {
      id: el.id,
      name: el.name.toLowerCase(),
      // height: el.height.metric,
      // weight: parseInt(el.weight.metric.replace('NaN', 31)),
      heightMin: parseInt(heightAPI[0]) ? parseInt(heightAPI[0]) : 12,
      heightMax: parseInt(heightAPI[1]) ? parseInt(heightAPI[1]) : 45,
      weightMin: parseInt(weightAPI[0]) ? parseInt(weightAPI[0]) : 21,
      weightMax: parseInt(weightAPI[1]) ? parseInt(weightAPI[1]) : 48,
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
const mergeInfo = async () => {
  const apiInfoAll = await getApiInfo();
  let dbInfo = await getInfoDb();
  dbInfo = await dbInfo.map((el) => {
    return {
      id: el.id,
      name: el.name.toLowerCase(),
      // height: el.height,
      // weight: el.weight,
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

  const temperamentsInfo = await axios.get(`https://api.thedogapi.com/v1/breeds`)
  const temperamentsBd = temperamentsInfo.data.map((e) => e.temperament)//muchos arrelos
    .toString()//Devuelve una cadena de caracteres (texto)
    .trim()// eliminar espacios en blanco y tablulaciones
    .split(/\s*,\s*/).sort();//Esto imprime dos líneas; la primera línea imprime la cadena ...original, y la segunda línea imprime el array resultante.

  const filtrado = temperamentsBd.filter(e => e);
  const filtradoEach = [... new Set(filtrado)];
  filtradoEach.forEach(e => {
    Temperament.findOrCreate({// se fija si esta y si no esta lo crea 
      where: { name: e },
    })
  })
  const allTemperament = await Temperament.findAll();
  return allTemperament
};


module.exports = {
  getApiInfo,
  getInfoDb,
  mergeInfo,
  getTemperamentAll
}