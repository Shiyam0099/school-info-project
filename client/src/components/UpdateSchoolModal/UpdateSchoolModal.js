import { useMutation, gql } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UPDATE_SCHOOL = gql`
  mutation UpdateSchool(
    $id: ID!
    $name: String!
    $address: String!
    $email: String!
    $contact: String!
  ) {
    updateSchool(
      id: $id
      data: { name: $name, address: $address, email: $email, contact: $contact }
    ) {
      id
      name
      address
      email
      contact
    }
  }
`;

export default function UpdateSchoolModal({
  schoolId,
  schoolName,
  schoolAddress,
  schoolEmail,
  schoolContact,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [address, setAddress] = useState(schoolAddress);
  const [name, setName] = useState(schoolName);
  const [email, setEmail] = useState(schoolEmail);
  const [contact, setContact] = useState(schoolContact);
  const [errorMessage, setError] = useState(null);

  const [updateSchool, { data, error, loading }] = useMutation(UPDATE_SCHOOL);

  useEffect(() => {
    if (error) {
      setError(error.message);
    }
  }, [error]);

  const handleClick = () => {
    if (!name || !address || !email || !contact) {
      return;
    } else {
      updateSchool({
        variables: {
          id: schoolId,
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
        Update
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update School Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>School ID</Form.Label>
              <Form.Control
                type="text"
                placeholder={schoolId}
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>School Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
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
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
