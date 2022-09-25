
export function validations({ name, weightMin, weightMax, heightMin, heightMax, life_span }) {
  let error = {}
  if (!name) { error.name = 'Se Requiere Un Nombre' }
  // else if (!/^([a-zñáéíóúA-Z][^\d@+.,-_{}]+[\s]?)+$/.test(name)) {
  //   error.name = 'Nombre Invalido'
  // }
  else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(name)) {
    error.name = "Nombre Invalido";
  }

  if (!weightMin) { error.weightMin = 'Peso Minimo Es Requerido' }
  else if (!/^[0-9]*$/.test(weightMin)) {
    error.weightMin = 'Requiere Valor Numerico'
  } else if (!/^[0-9]{1,3}$/.test(weightMin)) {
    error.weightMin = 'Debe Tener Menos De 4 Digitos'
  }


  if (!weightMax) { error.weightMax = 'Peso Maximo Es Requerido' }
  else if (!/^[0-9]*$/.test(weightMax)) {
    error.weightMax = 'Requiere Valor Numerico'
  }
  else if (!/^[0-9]{1,3}$/.test(weightMax)) {
    error.weightMax = 'Debe Tener Menos De 4 Digitos'
  }

  if (parseInt(weightMin) >= parseInt(weightMax)) {
    error.weightMax = 'El Peso Maximo Debe Ser Mayor'
  }

  if (!heightMin) { error.heightMin = 'Altura Minima Es Requerido' }
  else if (!/^[0-9]+$/.test(heightMin)) {
    error.heightMin = 'Requiere Valor Numerico'
  }
  else if (!/^[0-9]{1,3}$/.test(heightMin)) {
    error.heightMin = 'Debe Tener Menos De 4 Digitos'
  }

  if (!heightMax) { error.heightMax = 'Altura Maxima Es Requerido' }
  else if (!/^[0-9]*$/.test(heightMax)) {
    error.heightMax = 'Requiere Valor Numerico'
  }
  else if (!/^[0-9]{1,3}$/.test(heightMax)) {
    error.heightMax = 'Debe Tener Menos De 4 Digitos'
  }

  if (parseInt(heightMin) >= parseInt(heightMax)) {
    error.heightMax = 'La Altura Maxima Debe Ser Mayor'
  }

  if (!life_span) {
    error.life_span = 'Life_Span Es Requerido'
  }
  else if (!/^[0-9]{1,3}$/.test(life_span)) {
    error.life_span = 'Debe Tener Menos De 4 Digitos'
  }
  return error
};

