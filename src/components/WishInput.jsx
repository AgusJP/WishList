import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';


const WishInput = ({ state }) => {
  const wishInput = useRef();

  const handleOnClick = e => {
    e.preventDefault();
    if (wishInput.current.value === '') return;

    const auxWish = {
      id: uuidv4(),
      wishText: wishInput.current.value,
      wishDone: false,
    };
    state.setWishes([...state.wishes, auxWish]);

    wishInput.current.value = null;
    wishInput.current.autofocus = true;
  };

  return (
    <form onSubmit={handleOnClick}>
      <input
        ref={wishInput}
        type='text'
        placeholder='Inserte un nuevo deseo...'
      />
      <button type='button' onClick={handleOnClick}>
        Add Wish
      </button>
    </form>
  );
};

export default WishInput;
