const { Raza, Temperament } = require('.././db')

const {
  getAllInfo,
  getTemperamentAll
} = require('./ApiDb');


const getDogs = async (req, res) => {
  const { name } = req.query
  const todo = await getAllInfo();

  if (name) {
    const filter = todo.filter(data => data.name.toLowerCase() === name.toLowerCase());
    if (filter.length > 0) return res.status(200).json(filter);
    else return res.status(404).json(`El perro ${name} no existe ❌`);
  }
  return res.status(200).json(todo);
};

const getDogsId = async (req, res) => {
  const { id } = req.params;
  const filtro = await getAllInfo();
  const dogsId = filtro.find(data => parseInt(data.id) === parseInt(id));

  if (dogsId) return res.status(200).json(dogsId);
  else return res.status(404).json(`no existe el perro con id ${id}`);
};

const getTemperamento = async (req, res) => {
  try {
    let temps = await getTemperamentAll();
    res.status(200).json(temps);
  } catch (error) {
    console.log(error);
  }
};

const postDogs = async (req, res) => {
  const {
    name,
    heightMax,
    heightMin,
    weightMax,
    weightMin,
    temperament,
    life_span,
    image,
    createdInDb
  } = req.body;

  try {
    let NewRaza = await Raza.create({
      name,
      heightMax,
      heightMin,
      weightMax,
      weightMin,
      life_span,
      image,
      createdInDb
    });

    let temperamentNewDog = await Temperament.findAll({
      where: { name: temperament },
    });

    NewRaza.addTemperament(temperamentNewDog);
    return res.status(201).json("La Raza Ha Sido Creada Con Exito🟢");
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = {
  getDogs,
  getDogsId,
  getTemperamento,
  postDogs
}