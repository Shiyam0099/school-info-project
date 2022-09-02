import { useMutation, gql } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const DELETE_SCHOOL = gql`
  mutation DeleteSchool($id: ID!) {
    deleteSchool(id: $id)
  }
`;

export default function DeleteSchoolModal({
  schoolId,
  schoolName,
  schoolAddress,
  schoolEmail,
  schoolContact,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [errorMessage, setError] = useState(null);

  const [deleteSchool, { data, error, loading }] = useMutation(DELETE_SCHOOL);

  useEffect(() => {
    if (error) {
      setError(error.message);
    }
  }, [error]);

  const handleClick = () => {
    deleteSchool({
      variables: {
        id: schoolId,
      },
    });
    handleClose();
  };

  return (
    <>
      <Button variant="delete" onClick={handleShow}>
        Delete
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete {schoolName}?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Name: {schoolName}</p>
          <p>Location: {schoolAddress}</p>
          <p>Email: {schoolEmail}</p>
          <p>Contact: {schoolContact}</p>
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
