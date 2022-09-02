import { useMutation, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ADMIN_SIGNUP = gql`
  mutation AdminSignup($email: String!, $password: String!, $name: String!) {
    adminSignup(data: { name: $name, email: $email, password: $password }) {
      message
      user {
        id
        name
      }
      token
    }
  }
`;

export default function AdminSignup() {
  const [adminSignup, { data, error }] = useMutation(ADMIN_SIGNUP);

  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    adminSignup({
      variables: {
        name,
        email,
        password,
      },
    });
  };

  const [errorMessage, setError] = useState(null);

  useEffect(() => {
    if (error) {
      setError(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      if (data.signup.token) {
        localStorage.setItem("token", data.signup.token);
        localStorage.setItem("user-name", data.adminSignup.user.name);
        localStorage.setItem("user-id", data.adminSignup.user.id);
        history.push(`/admin-schools`);
        window.location.reload();
      }
    }
  }, [data, history]);
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Admin Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {errorMessage && <p>{errorMessage}</p>}
        <Button variant="sign" onClick={handleClick}>
          Signup
        </Button>
      </Form>
    </div>
  );
}
