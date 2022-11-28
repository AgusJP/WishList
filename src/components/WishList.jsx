import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext } from 'react-beautiful-dnd';
import NavBar from './NavBar';
import WishInput from './WishInput.jsx';
import WishSearch from './WishSearch.jsx';

const WishList = () => {
  const [wishes, setWishes] = useState([
    { id: uuidv4(), wishText: 'Ganar la lotería', wishDone: false },
    { id: uuidv4(), wishText: 'Encontrar trabajo', wishDone: false },
    { id: uuidv4(), wishText: 'Ser feliz', wishDone: true },
  ]);

  useEffect(() => {
    setWishes(JSON.parse(localStorage.getItem('wishes')) || wishes);
  }, []);

  useEffect(() => {
    localStorage.setItem('wishes', JSON.stringify(wishes));
  }, [wishes]);

  const toggleWishDone = id => {
    const newWishes = [...wishes];
    const wish = newWishes.find(wish => wish.id === id);
    wish.wishDone = !wish.wishDone;
    setWishes(newWishes);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

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

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <NavBar />
      <WishInput state={{ wishes, setWishes }} />
      <WishSearch params={{ wishes, setWishes, toggleWishDone }} />
    </DragDropContext>
  );
};

export default WishList;
