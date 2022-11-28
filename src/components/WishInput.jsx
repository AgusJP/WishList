import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import '../styles/wishInput.css';

const WishInput = ({ params: { wishes, setWishes } }) => {
  const wishInput = useRef();

  const handleOnClick = e => {
    e.preventDefault();
    if (wishInput.current.value === '') return;

    const auxWish = {
      id: uuidv4(),
      wishText: wishInput.current.value,
      wishDone: false,
    };
    setWishes([...wishes, auxWish]);

    wishInput.current.value = null;
    wishInput.current.autofocus = true;
  };

  return (
    <form className='container-wishInput' onSubmit={handleOnClick}>
      <input
        ref={wishInput}
        type='text'
        name='text'
        className='create-input'
        placeholder='Añadir deseo...'
      />
      <button className='btn-create' type='button' onClick={handleOnClick}>
        <div className='svg-wrapper-1'>
          <div className='svg-wrapper'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'
            >
              <path fill='none' d='M0 0h24v24H0z'></path>
              <path
                fill='currentColor'
                d='M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z'
              ></path>
            </svg>
          </div>
        </div>
        <span>Add Wish</span>
      </button>
    </form>
  );
};

// Definición de los propTypes.


export default WishInput;
