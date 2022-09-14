import axios from 'axios';

function getDog() {
  return async function (dispatch) {
    let json = await axios.get('http://localhost:3001/dogs');
    return dispatch({
      type: 'GET_DOG',
      payload: json.data
    })
  }
};
function getTemperaments() {
  return async function (dispatch) {
    let json = await axios.get('http://localhost:3001/temperaments');
    return dispatch({
      type: 'GET_TEMPERAMENTS',
      payload: json.data
    })
  }
};

function getDogName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      return dispatch({
        type: 'GET_DOG_NAME',
        payload: json.data
      })
    } catch (error) {
      alert(`No se encontro el perro ${name}`);
    }
  }
};

function postDog(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post('http://localhost:3001/dogs', payload)
      console.log(json);
      return dispatch({
        type: 'POST_DOG',
        payload: json.data
      })
    } catch (error) {
      alert(`Falta algun dato obligatorio, verifique`)
    }
  }
};


function getDogId(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: 'GET_DOG_ID',
        payload: json.data
      })
    } catch (error) {
      alert(`No se encontro el dog con id ${id}`);
    }
  }
};


function filterDogTemperaments(payload) {
  console.log(payload)
  return {
    type: 'FILTER_DOG_TEMPERAMENTS',
    payload
  }
};
function filterDogCreated(payload) {
  console.log(payload)
  return {
    type: 'FILTER_DOG_CREATE',
    payload
  }
};
function orderByName(payload) {
  console.log(payload)
  return {
    type: 'ORDER_BY_NAME',
    payload
  }
};

function orderByWeight(payload) {
  console.log(payload)
  return {
    type: 'ORDER_BY_PESO',
    payload
  }
};



export {
  getDog,
  getTemperaments,
  filterDogTemperaments,
  filterDogCreated,
  orderByName,
  orderByWeight,
  getDogName,
  postDog,
  getDogId
};