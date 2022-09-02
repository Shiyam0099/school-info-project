import { useMutation, gql } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ADD_SCHOOL = gql`
  mutation AddSchool(
    $name: String!
    $address: String!
    $email: String!
    $contact: String!
  ) {
    addSchool(
      data: { name: $name, address: $address, email: $email, contact: $contact }
    ) {
      name
      address
      active
      email
      contact
      schoolAdmin {
        name
      }
      createdAt
    }
  }
`;

export default function AddSchoolModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [errorMessage, setError] = useState(null);

  const [addSchool, { data, error, loading }] = useMutation(ADD_SCHOOL);

  useEffect(() => {
    if (error) {
      setError(error.message);
    }
  }, [error]);

  const handleClick = () => {
    if (!name || !address || !email || !contact) {
      return;
    } else {
      addSchool({
        variables: {
          name,
          address,
          email,
          contact,
        },
      });
      handleClose();
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add School
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add School Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>School Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter school name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter school address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter school email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter school contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          {errorMessage && <p>{errorMessage}</p>}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
