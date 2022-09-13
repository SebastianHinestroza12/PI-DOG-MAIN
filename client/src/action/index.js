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

function filterDogTemperaments(payload) {
  console.log(payload)
  return {
    type: 'FILTER_DOG_TEMPERAMENTS',
    payload
  }
};



export {
  getDog,
  getTemperaments,
  filterDogTemperaments
}