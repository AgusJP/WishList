import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import { Droppable } from 'react-beautiful-dnd';
import WishItem from './WishItem.jsx';
import '../styles/WishSearch.css';

/**
 * WishSearch Component
 * @param { Object } params - Object containing the wishes state and its function to modify it.
 * @param { Object[] } wishes - State.
 * @param { String } wishes[].id - Identifier of a wish.
 * @param { String } wishes[].wishText - Text of a wish.
 * @param { Boolean } wishes[].wishDone - Done/Pending wish.
 * @param { Function } setWishes - Function that modifies the state.
 * @param { Function } toggleWishDone - Function that modifies the checkbox change.
 * @returns - Render wishSearch input and the list of wishes (filtered and not filtered).
 */
const WishSearch = ({ params: { wishes, setWishes, toggleWishDone } }) => {
  // Auxiliar array to store the searched wishes.
  const [searchWishes, setSearchWishes] = useState([]);
  // Input search term.
  const [searchTerm, setSearchTerm] = useState('');

  // Handles the change of the search term and sets the new array with the found elements.
  const handleChange = e => {
    setSearchTerm(e.target.value);
    filterSearch(e.target.value);
  };

  const filterSearch = searchTerm => {
    const resultadosBusqueda = wishes.filter(element =>
      element.wishText.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchWishes(resultadosBusqueda);
  };

  // Delete a Wish.
  const handleDelete = id => {
    setWishes(wishes.filter(wish => wish.id !== id));
  };

  // Edit a Wish
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
};

// Definition of propTypes.
WishSearch.propTypes = {
  params: PropTypes.shape({
    wishes: PropTypes.array.isRequired,
    setWishes: PropTypes.func.isRequired,
    toggleWishDone: PropTypes.func.isRequired,
  }),
};

export default WishSearch;
