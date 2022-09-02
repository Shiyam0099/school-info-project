import { useMutation, gql } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const DELETE_PROFILE = gql`
  mutation {
    deleteUser
  }
`;

export default function DeleteProfileModal({ userId, userName, userEmail }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [errorMessage, setError] = useState(null);

  const [deleteUser, { data, error, loading }] = useMutation(DELETE_PROFILE);

  useEffect(() => {
    if (error) {
      setError(error.message);
    }
  }, [error]);

  const handleClick = () => {
    deleteUser({
      variables: {},
    });
    handleClose();
  };

  return (
    <>
      <Button variant="delete" onClick={handleShow}>
        Delete Profile
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete {userName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Are you sure?</h2>
        </Modal.Body>

        <Modal.Footer>
          {errorMessage && <p>{errorMessage}</p>}
          <Button variant="primary" onClick={handleClick}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
