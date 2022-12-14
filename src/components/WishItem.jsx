import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { Draggable } from 'react-beautiful-dnd';
import '../styles/wishItem.css';

/**
 * Callback to run when change the checkbox.
 * @callback toogleWishDone - Callback to run when change the checkbox.
 * @param { String } id - Identifier of a wish.
 */

/**
 * Callback to run when click delete Button.
 * @callback handleDelete - Callback to run when click delete Button.
 * @param { String } id - Identifier of a wish.
 */

/**
 * Callback to run when click edit Button.
 * @callback handleEdit - Callback to run when click edit Button.
 * @param { Object } Wish - Wish updated.
 * @param { String } Wish.id - Identifier of a wish.
 * @param { String } Wish.wishText - Text of a wish.
 * @param { Boolean } Wish.wishDone - Done/Pending wish.
 */

/**
 * WishItem Component
 * @param { Object } wish -Wish
 * @param { String } wish[].id - Identifier of a wish.
 * @param { String } wish[].wishText - Text of a wish.
 * @param { Boolean } wish[].wishDone - Done/Pending wish.
 * @param { Object } index - Wish Index.
 * @param { Object } toogleWishDone callback - Callback to handle wish done property.
 * @param { Object } handleDelete callback - Callback to handle the removal of a wish.
 * @param { Object } handleEdit callback - Callback to handle the edition of a wish.
 * @returns - Render a WishItem
 */
const WishItem = ({
  wish,
  index,
  toggleWishDone,
  handleDelete,
  handleEdit,
}) => {
  // Modal states.
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Destructuring wish.
  const { id: idv4, wishText, wishDone } = wish;

  // References to edit input and checkbox.
  const wishEditInput = useRef();
  const wishEditCheck = useRef();

  // Hanfle checkbox change.
  const handleToggleWishDone = () => {
    toggleWishDone(idv4);
  };

  // Handle edit wish.
  const handleOnEdit = () => {
    handleEdit(
      wish,
      wishEditInput.current.value,
      wishEditCheck.current.checked
    );
    setShow(!show);
  };

  return (
    <>
      <Draggable key={idv4} draggableId={idv4} index={index}>
        {draggableProvided => (
          <ListGroup.Item
            {...draggableProvided.draggableProps}
            ref={draggableProvided.innerRef}
            {...draggableProvided.dragHandleProps}
          >
            <div className='container-item'>
              <div>
                <input
                  className='checkbox-item'
                  id={idv4}
                  type='checkbox'
                  onChange={handleToggleWishDone}
                  checked={wishDone}
                />
                <label
                  className={wishDone ? 'line-through' : 'none'}
                  htmlFor={idv4}
                >
                  {wishText}
                </label>
              </div>
              <div className='buttons'>
                <Button variant='danger' onClick={() => handleDelete(idv4)}>
                  Eliminar
                </Button>
                <Button variant='primary' onClick={handleShow}>
                  Editar
                </Button>
              </div>
            </div>
          </ListGroup.Item>
        )}
      </Draggable>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editando Deseo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            ref={wishEditCheck}
            type='checkbox'
            defaultChecked={wishDone}
          />
          <input
            className='editInput'
            ref={wishEditInput}
            autoFocus
            type='text'
            defaultValue={wishText}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Salir
          </Button>
          <Button variant='primary' onClick={handleOnEdit}>
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// Definition of propTypes.
WishItem.propTypes = {
  wish: PropTypes.shape({
    id: PropTypes.string.isRequired,
    wishText: PropTypes.string.isRequired,
    wishDone: PropTypes.bool.isRequired,
  }),
  index: PropTypes.number.isRequired,
  toggleWishDone: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default WishItem;
