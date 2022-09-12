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


export {
  getDog
}