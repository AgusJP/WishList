import React from 'react';
import '../styles/navBar.css';

/**
 * NavBar Component
 * @returns - Html with the logo and title of the App.
 */
const NavBar = () => {
  return (
    <div className='container-navbar'>
      <img src='../assets/wishlist.svg' alt='wishlist' width={50} />
      <h1>My WishList</h1>
    </div>
  );
};

export default NavBar;
