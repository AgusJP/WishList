import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import '../styles/wishInput.css';

/**
 * WishInput Component.
 * @param { Object } params - Object containing the wishes state and its function to modify it.
 * @param { Object[] } wishes - State.
 * @param { String } wishes[].id - Identifier of a wish.
 * @param { String } wishes[].wishText - Text of a wish.
 * @param { Boolean } wishes[].wishDone - Done/Pending wish.
 * @param { Function } setWishes - Function that modifies the state.
 * @returns - The form in charge of creating a new wish formed by a text field and the submit button.
 */
const WishInput = ({ params: { wishes, setWishes } }) => {
  // Reference to the form input.
  const wishInput = useRef();

  // Function responsible to create a new wish.
  const handleOnCreate = e => {
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
    <form className='container-wishInput' onSubmit={handleOnCreate}>
      <input
        ref={wishInput}
        type='text'
        name='text'
        className='create-input'
        placeholder='Añadir deseo...'
      />
      <button className='btn-create' type='button' onClick={handleOnCreate}>
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

// Definition of propTypes.
WishInput.propTypes = {
  params: PropTypes.shape({
    wishes: PropTypes.array.isRequired,
    setWishes: PropTypes.func.isRequired,
  }),
};

export default WishInput;
