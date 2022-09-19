import axios from 'axios';
import Swal from 'sweetalert2';


function getDog() {
  return async function (dispatch) {
    let json = await axios.get('/dogs');
    return dispatch({
      type: 'GET_DOG',
      payload: json.data
    })
  }
};

function getTemperaments() {
  return async function (dispatch) {
    let json = await axios.get('/temperaments');
    return dispatch({
      type: 'GET_TEMPERAMENTS',
      payload: json.data
    })
  }
};

function getDogName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`/dogs?name=${name}`);
      return dispatch({
        type: 'GET_DOG_NAME',
        payload: json.data
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `No Se Encontro El Perro ${name}`,
        timer: 2000,
        confirmButtonColor: 'blue',
      });
    }
  }
};

function postDog(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post('/dogs', payload)
      console.log(json);
      return dispatch({
        type: 'POST_DOG',
        payload: json.data
      })
    } catch (error) {
      console.log(error);
    }
  }
};


function getDogId(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`/dogs/${id}`);
      return dispatch({
        type: 'GET_DOG_ID',
        payload: json.data
      })
    } catch (error) {
      console.log(error);
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

function clearState() {
  return {
    type: 'CLEAR_STATE'
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
  getDogId,
  clearState
};