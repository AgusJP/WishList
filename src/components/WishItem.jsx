import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Draggable } from 'react-beautiful-dnd';
import ListGroup from 'react-bootstrap/ListGroup';

import '../styles/wishItem.css';

const WishItem = ({
  wish,
  index,
  toggleWishDone,
  handleDelete,
  handleEdit,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id: idv4, wishText, wishDone } = wish;

  const wishEditInput = useRef();
  const wishEditCheck = useRef();

  const handleToggleWishDone = () => {
    toggleWishDone(idv4);
  };

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

WishItem.propTypes = {
  wish: PropTypes.shape({
    wishText: PropTypes.string.isRequired,
    wishDone: PropTypes.bool.isRequired,
  }),
};

WishItem.defaultProps = {
  wish: {},
};

export default WishItem;
