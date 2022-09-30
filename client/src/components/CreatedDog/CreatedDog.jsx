import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments, getDog } from "../../action";
import './CreatedDog.css';
import Swal from 'sweetalert2';
import { validations } from './Validate';


const CreatedDog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperamento = useSelector(state => state.temperaments);
  const [errors, setErrors] = useState({});
  // const [errorButton, setErrorButton] = useState(false);

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
    if (input.temperament.length <= 4) {
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
    }
    else {
      Swal.fire({
        title: `Maximo 5 Temperamentos`,
        icon: 'info',
        timer: 2000,
        confirmButtonColor: 'orange',
      })
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    const existeName = allDogs.filter(
      (e) => e.name.toLowerCase() === input.name.toLowerCase()
    );

    if (existeName.length > 0) {
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
        }, 3000)
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
                required

              />
              {<span className="error">{errors.name}</span>}

            </div>

            <div className="display-input">
              <label>Peso Minimo</label>
              <input type="number"
                value={input.weightMin}
                name='weightMin'
                onChange={(e) => handleChange(e)}
                required
              />
              {<span className="error">{errors.weightMin}</span>}
            </div>

            <div className="display-input">
              <label>Peso Maximo</label>
              <input type="number"
                value={input.weightMax}
                name='weightMax'
                onChange={(e) => handleChange(e)}
                required

              />
              {<span className="error">{errors.weightMax}</span>}
            </div>

            <div className="display-input">
              <label>Altura Minima</label>
              <input type="number"
                value={input.heightMin}
                name='heightMin'
                onChange={(e) => handleChange(e)}
                required

              />
              {<span className="error">{errors.heightMin}</span>}
            </div>

            <div className="display-input">
              <label>Altura Maxima</label>
              <input type="number"
                value={input.heightMax}
                name='heightMax'
                onChange={(e) => handleChange(e)}
                required

              />
              {<span className="error">{errors.heightMax}</span>}
            </div>

            <div className="display-input">
              <label>Años De Vida</label>
              <input type="text"
                value={input.life_span}
                name='life_span'
                onChange={(e) => handleChange(e)}
                required

              />
              {<span className="error">{errors.life_span}</span>}
            </div>

            <div className="display-input" >

              <label>Imagen(Opcional)</label>
              <input type="url"
                value={input.image}
                name='image'
                onChange={(e) => handleChange(e)}
                placeholder="Url De Imagen"

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
              <button
                type="submit">Crear Perro
              </button>
            </div>
          </div>

        </div>
        <div className="conta">

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
        </div>

      </form>
    </div>
  )
};


export { CreatedDog }