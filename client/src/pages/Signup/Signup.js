import { useMutation, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup(data: { name: $name, email: $email, password: $password }) {
      message
      user {
        id
        name
        email
      }
      token
    }
  }
`;

export default function Signup() {
  const [signup, { data, error }] = useMutation(SIGNUP);

  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    signup({
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
        localStorage.setItem("token", data.signup.user.id);
        localStorage.setItem("token", data.signup.user.name);
        history.push(`/schools`);
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
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
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
