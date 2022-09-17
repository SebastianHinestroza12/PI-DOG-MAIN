import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments, getDog } from "../../action";
import './CreatedDog.css';
import Swal from 'sweetalert2';



function validations({ name, weightMin, weightMax, heightMin, heightMax, life_span }) {
  let error = {}
  if (!name) { error.name = 'Se Requiere Un Nombre' }
  else if (!/^([a-zñáéíóúA-Z][^\d@+.,-_{}]+[\s]?)+$/.test(name)) {
    error.name = 'Nombre Invalido'
  }

  if (!weightMin) { error.weightMin = 'Ingrese Peso Minimo' }
  else if (!/^[0-9]*$/.test(weightMin)) {
    error.weightMin = 'Requiere Valor Numerico'
  } else if (!/^[0-9]{1,3}$/.test(weightMin)) {
    error.weightMin = 'Debe Tener Menos De 4 Digitos'
  }


  if (!weightMax) { error.weightMax = 'Ingrese Peso Maximo' }
  else if (!/^[0-9]*$/.test(weightMax)) {
    error.weightMax = 'Requiere Valor Numerico'
  }
  else if (!/^[0-9]{1,3}$/.test(weightMax)) {
    error.weightMax = 'Debe Tener Menos De 4 Digitos'
  }

  if (parseInt(weightMin) >= parseInt(weightMax)) {
    error.weightMax = 'El Peso Maximo Debe Ser Mayor'
  }

  if (!heightMin) { error.heightMin = 'Ingrese Altura Minima' }
  else if (!/^[0-9]+$/.test(heightMin)) {
    error.heightMin = 'Requiere Valor Numerico'
  }
  else if (!/^[0-9]{1,3}$/.test(heightMin)) {
    error.heightMin = 'Debe Tener Menos De 4 Digitos'
  }

  if (!heightMax) { error.heightMax = 'Ingrese Altura Maxima' }
  else if (!/^[0-9]*$/.test(heightMax)) {
    error.heightMax = 'Requiere Valor Numerico'
  }
  else if (!/^[0-9]{1,3}$/.test(heightMax)) {
    error.heightMax = 'Debe Tener Menos De 4 Digitos'
  }

  if (parseInt(heightMin) >= parseInt(heightMax)) {
    error.heightMax = 'La Altura Maxima Debe Ser Mayor'
  }

  if (!/^[0-9]+$/.test(life_span)) {
    error.life_span_min = 'Requiere Valor Numerico'
  }
  else if (!/^[0-9]{1,3}$/.test(life_span)) {
    error.life_span_min = 'Debe Tener Menos De 4 Digitos'
  }
  return error
};

const CreatedDog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperamento = useSelector(state => state.temperaments);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    temperament: [],
    life_span: "",
    image: "",
  })

  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getDog());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });

    setErrors(
      validations({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    console.log(input)
  };

  const handleSelct = (e) => {
    if (input.temperament === "") setInput({ ...input, temperament: [] });
    if (Object.values(input.temperament).includes(e.target.value)) {
      Swal.fire({
        title: `Temperamento Duplicado`,
        icon: 'warning',
        timer: 3000,
        confirmButtonColor: 'orange',
      })
    } else {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault(e);
    const existeName = allDogs.filter(
      (e) => e.name.toLowerCase() === input.name.toLowerCase()
    );

    if (existeName) {
      return (
        Swal.fire({
          title: `Ya Existe El Perro ${input.name}`,
          icon: 'info',
          timer: 3000,
          confirmButtonColor: 'blue',
        })
      )
    } else {
      if (!Object.keys(input).length || input.temperament.length === 0) {
        alert("Complete all options");
        Swal.fire({
          title: `Complete Todos Los Campos`,
          icon: 'error',
          text: 'Todos Son Obligstorios, Menos La Imagen',
          timer: 4000,
          confirmButtonColor: 'Red',
        })
      } else if (Object.keys(errors).length) {
        Swal.fire({
          title: `Datos Incorrectos`,
          icon: 'error',
          timer: 4000,
          confirmButtonColor: 'Red',
        })
      }
      else {
        dispatch(postDog(input))
        Swal.fire({
          title: `El Perro ${input.name} Fue Creado Con Exito`,
          icon: 'success',
          text: 'Sera Redirigido Al Inicio',
          timer: 3000,
          confirmButtonColor: 'green',
        })
        setInput({
          name: "",
          weightMin: "",
          weightMax: "",
          heightMin: "",
          heightMax: "",
          temperament: [],
          life_span: "",
          image: "",
        })
        setTimeout(() => {
          history.push('/home')
        }, 4000)
      }
    }
  }

  const handleDelete = (e) => {
    setInput(
      {
        ...input,
        temperament: input.temperament.filter(data => data !== e)
      }
    )
  };

  return (
    <div className="container-dog">

      <form className="container-form" onSubmit={e => handleSubmit(e)}>
        <div className="container-input">
          <div className="button-volver">
            <Link className="link-dog" to="/home"><button>Regresar</button></Link>
          </div>

          <div className="formulario">
            <div className="titulo">
              <h1>Crea Tu Perro</h1>
            </div>

            <div className="display-input">
              <label>Nombre</label>
              <input type="text"
                value={input.name}
                name='name'
                onChange={e => handleChange(e)}
              />
              {<span>{errors.name}</span>}

            </div>

            <div className="display-input">
              <label>Peso Minimo</label>
              <input type="number"
                value={input.weightMin}
                name='weightMin'
                onChange={(e) => handleChange(e)}
              />
              {<span>{errors.weightMin}</span>}
            </div>

            <div className="display-input">
              <label>Peso Maximo</label>
              <input type="number"
                value={input.weightMax}
                name='weightMax'
                onChange={(e) => handleChange(e)}
              />
              {<span>{errors.weightMax}</span>}
            </div>

            <div className="display-input">
              <label>Altura Minima</label>
              <input type="number"
                value={input.heightMin}
                name='heightMin'
                onChange={(e) => handleChange(e)}
              />
              {<span>{errors.heightMin}</span>}
            </div>

            <div className="display-input">
              <label>Altura Maxima</label>
              <input type="number"
                value={input.heightMax}
                name='heightMax'
                onChange={(e) => handleChange(e)}
              />
              {<span>{errors.heightMax}</span>}
            </div>

            <div className="display-input">
              <label>Años De Vida</label>
              <input type="text"
                value={input.life_span}
                name='life_span'
                onChange={(e) => handleChange(e)}
              />
              {<span>{errors.life_span}</span>}
            </div>

            <div className="display-input" >

              <label>Imagen</label>
              <input type="search"
                value={input.image}
                name='image'
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="display-input">
              <label>Temperamentos</label>
              <select onChange={(e) => handleSelct(e)}>
                {allTemperamento?.map((e) => {
                  return (
                    <option value={e.name} key={e.id}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="display-input btn-crear">
              <button type="submit">Crear Perro</button>
            </div>
          </div>

        </div>
        <div className="container-temp">
          {input.temperament?.map((e) => (
            <div key={e}>
              <button
                type="button"
                key={e}
                value={e}
                onClick={() => handleDelete(e)}
                className='delete-button'
              >
                {e}
              </button>
            </div>
          ))}
        </div>

      </form>
    </div>
  )

};


export { CreatedDog }