import { useMutation, gql } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UPDATE_USER = gql`
  mutation UpdateUser($name: String!, $email: String!, $password: String!) {
    updateUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
      password
    }
  }
`;

export default function UpdateProfileModal({ userName, userEmail }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [address, setAddress] = useState(schoolAddress);
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState(null);

  const [updateUser, { data, error, loading }] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (error) {
      setError(error.message);
    }
  }, [error]);

  const handleClick = () => {
    if (!name || !email) {
      return;
    } else {
      updateUser({
        variables: {
          name,
          email,
          password,
        },
      });
      handleClose();
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Update Profile
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update User Information</Modal.Title>
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
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
