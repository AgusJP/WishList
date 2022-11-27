import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import WishItem from './WishItem.jsx';

function WishSearch({ params: { wishes, setWishes, toggleWishDone } }) {
  const [searchWishes, setSearchWishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = e => {
    setSearchTerm(e.target.value);
    filtrar(e.target.value);
  };

  const handleDelete = id => {
    setWishes(wishes.filter(wish => wish.id !== id));
  };

  const handleEdit = (wish, wishEditText, wishEditDone) => {
    const editedWishes = wishes.map(element => {
      if (element.id === wish.id) {
        const auxWish = {
          id: element.id,
          wishText: wishEditText,
          wishDone: wishEditDone,
        };
        return auxWish;
      }
      return element;
    });
    setWishes(editedWishes);
  };

  const filtrar = searchTerm => {
    const resultadosBusqueda = wishes.filter(element =>
      element.wishText.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchWishes(resultadosBusqueda);
  };

  return (
    <>
      <input
        type='search'
        value={searchTerm}
        placeholder='Search wish'
        onChange={handleChange}
      />
      {searchTerm ? (
        <ul>
          {searchWishes.map(wish => {
            return <li key={wish.id}>{wish.wishText}</li>;
          })}
        </ul>
      ) : (
        <Droppable droppableId='wishes'>
          {droppableProvided => (
            <ul
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {wishes.map((wish, i) => (
                <WishItem
                  key={wish.id}
                  wish={wish}
                  index={i}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  toggleWishDone={toggleWishDone}
                />
              ))}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
      )}
    </>
  );
}

export default WishSearch;
