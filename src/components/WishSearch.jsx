import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import WishItem from './WishItem.jsx';
import ListGroup from 'react-bootstrap/ListGroup';

import '../styles/WishSearch.css';

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
      <div className='group'>
        <svg className='icon' aria-hidden='true' viewBox='0 0 24 24'>
          <g>
            <path d='M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z'></path>
          </g>
        </svg>
        <input
          className='input-search'
          type='search'
          value={searchTerm}
          placeholder='Buscar deseo'
          onChange={handleChange}
        />
      </div>

      {searchTerm ? (
        <ListGroup>
          {searchWishes.map(wish => {
            return (
              <ListGroup.Item key={wish.id}>{wish.wishText}</ListGroup.Item>
            );
          })}
        </ListGroup>
      ) : (
        <Droppable droppableId='wishes'>
          {droppableProvided => (
            <ListGroup
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
            </ListGroup>
          )}
        </Droppable>
      )}
    </>
  );
}

export default WishSearch;
