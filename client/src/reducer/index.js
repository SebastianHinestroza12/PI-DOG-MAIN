const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
};


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DOG':
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload
      }
    case 'GET_TEMPERAMENTS':
      return {
        ...state,
        temperaments: action.payload
      }

    // ! AQUI PUEDE HABER UN ERROR
    case 'FILTER_DOG_TEMPERAMENTS':
      const allDog = state.allDogs;
      const filteredDogs = allDog.filter((el) =>
        el.temperament?.includes(action.payload)
      );
      return {
        ...state,
        dogs: filteredDogs,
      }

    default:
      return state
  }
};


export { rootReducer }