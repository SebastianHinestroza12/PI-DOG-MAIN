const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  detail: []

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
      const filteredDogs = action.payload === 'todos' ? allDog : allDog.filter((el) =>
        el.temperament?.includes(action.payload)
      );
      return {
        ...state,
        dogs: filteredDogs,
      }
    case 'FILTER_DOG_CREATE':
      let estado = state.allDogs;
      const filterCreated = action.payload === 'todos' ? estado : action.payload === 'existentes' ? estado : estado.filter(data => data.id.length > 4);

      return {
        ...state,
        dogs: filterCreated
      }
    case 'ORDER_BY_NAME':
      let orderState = state.dogs;
      let sort = action.payload === 'asc' ? orderState.sort((a, b) => {
        /* Ordenar la matriz por nombre. */
        if (a.name > b.name) return 1
        if (b.name > a.name) return -1
        return 0
      }) : orderState.sort((a, b) => {
        if (a.name > b.name) return -1
        if (b.name > a.name) return 1
        return 0
      })
      return {
        ...state,
        dogs: sort
      }
    case 'ORDER_BY_PESO':
      let orderPeso = state.dogs;
      let sortPeso = action.payload === 'liviano' ? orderPeso.sort((a, b) => {
        /* Ordenar la matriz por nombre. */
        if (a.weightMax > b.weightMax) return 1
        if (b.weightMax > a.weightMax) return -1
        return 0
      }) : orderPeso.sort((a, b) => {
        if (a.weightMax > b.weightMax) return -1
        if (b.weightMax > a.weightMax) return 1
        return 0
      });



      return {
        ...state,
        dogs: sortPeso
      }
    case 'GET_DOG_NAME':
      return {
        ...state,
        dogs: action.payload
      }

    case 'POST_DOG':
      return {
        ...state,
      }
    case 'GET_DOG_ID':
      return {
        ...state,
        detail: action.payload
      }
    case 'CLEAR_STATE':
      return {
        ...state,
        detail: []
      };

    default:
      return state
  }
};


export { rootReducer }