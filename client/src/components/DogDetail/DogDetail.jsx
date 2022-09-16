import React from 'react';
import { getDogId, clearState } from '../../action/index';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, StrictMode } from 'react';
import { Loading } from '.././Loading/Loading';
import './DogDetail.css';

const DogDetail = () => {

  const dispatch = useDispatch();
  const detailDog = useSelector(state => state.detail)
  const { id } = useParams()
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    dispatch(clearState());
    dispatch(getDogId(id)).then(() => setLoader(false));
  }, [dispatch, id])


  return (
    <div className='container-detail'>
      <div>
        <StrictMode>
          {loader ? (
            <div>
              <Loading />
            </div>
          ) : (
            <div className='container-item-dog'>
              <div>
                <Link className='link-detail' to="/home">
                  <button>Regresar</button>
                </Link>
              </div>
              <div>
                <h2>{detailDog.name}</h2>
                <h2>{`# ${detailDog.id}`}</h2>
                <img className='imagen-detail' src={detailDog.image} alt={detailDog.name} />
              </div>
              <div >
                <div>
                  <p>{`Altura : ${detailDog.heightMin}-${detailDog.heightMax} Cm`} </p>
                </div>

                <div>
                  <p>{`Peso : ${detailDog.weightMin}-${detailDog.weightMax} Kg`}</p>
                </div>
                <div>
                  <p>{`Años De Vida : ${detailDog.life_span}`}</p>
                </div>
                <div>
                  <p>{`Temperamento :  ${detailDog.temperament}`}</p>
                </div>
              </div>
            </div>
          )}
        </StrictMode>
      </div>
    </div>
  );
}


export { DogDetail }