import React from 'react';
import '../styles/navBar.css';

const NavBar = () => {
  return (
    <div className='container-navbar'>
      <img src='../assets/wishlist.svg' alt='wishlist' width={50} />
      <h1>My WishList</h1>
    </div>
  );
};

export default NavBar;
