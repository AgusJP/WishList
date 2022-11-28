import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext } from 'react-beautiful-dnd';
import NavBar from './NavBar';
import WishInput from './WishInput.jsx';
import WishSearch from './WishSearch.jsx';

/**
 * WishList component in charge of managing the state and persistence of the Wishes.
 * @returns Html of different parts of the APP (Navbar, WishInput and WishSearch)
 */
const WishList = () => {
  // Initial state of wishes.
  const [wishes, setWishes] = useState([
    { id: uuidv4(), wishText: 'Ganar la lotería', wishDone: false },
    { id: uuidv4(), wishText: 'Encontrar trabajo', wishDone: false },
    { id: uuidv4(), wishText: 'Ser feliz', wishDone: true },
    { id: uuidv4(), wishText: 'Testeando', wishDone: false },
    { id: uuidv4(), wishText: 'Probando', wishDone: true },
  ]);

  // Recuperate wishes from localStorage.
  useEffect(() => {
    setWishes(JSON.parse(localStorage.getItem('wishes')) || wishes);
  }, []);

  // Save wishes to localStorage every time there is a change in state.
  useEffect(() => {
    localStorage.setItem('wishes', JSON.stringify(wishes));
  }, [wishes]);

  // Save a wish by editing its checkBox.
  const toggleWishDone = id => {
    const newWishes = [...wishes];
    const wish = newWishes.find(wish => wish.id === id);
    wish.wishDone = !wish.wishDone;
    setWishes(newWishes);
  };

  // It handles drag and drop within the DropContext.
  const handleOnDragEnd = result => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      return;

    setWishes(prevTasks => reorder(prevTasks, source.index, destination.index));
  };

  // Reorder items in the list, after dragging and dropping them to another position.
  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <NavBar />
      <WishInput params={{ wishes, setWishes }} />
      <WishSearch params={{ wishes, setWishes, toggleWishDone }} />
    </DragDropContext>
  );
};

export default WishList;
