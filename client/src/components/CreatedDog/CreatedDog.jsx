import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../../action";
import './CreatedDog.css';
import Swal from 'sweetalert2';

const CreatedDog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allTemperamento = useSelector(state => state.temperaments);

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
  }, [dispatch]);


  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });

    console.log(input)
  };

  const handleSelct = (e) => {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value]
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault(e);
    dispatch(postDog(input))
    // Swal.fire({
    //   title: `El Perro ${input.name} Fue Creado Con Exito`,
    //   icon: 'success',
    //   text: 'Sera Redirigido Al Inicio',
    //   timer: 3000,
    //   confirmButtonColor: 'green',
    // })
    alert('Perro Creado Correctamente')
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
            </div>

            <div className="display-input">
              <label>Peso Minimo</label>
              <input type="number"
                value={input.weightMin}
                name='weightMin'
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="display-input">
              <label>Peso Maximo</label>
              <input type="number"
                value={input.weightMax}
                name='weightMax'
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="display-input">
              <label>Altura Minima</label>
              <input type="number"
                value={input.heightMin}
                name='heightMin'
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="display-input">
              <label>Altura Maxima</label>
              <input type="number"
                value={input.heightMax}
                name='heightMax'
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="display-input">
              <label>Años De Vida</label>
              <input type="text"
                value={input.life_span}
                name='life_span'
                onChange={(e) => handleChange(e)}
              />
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