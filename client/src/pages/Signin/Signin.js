import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SIGNIN = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      message
      user {
        id
        name
      }
      token
    }
  }
`;

export default function Signin() {
  const [signin, { data, error }] = useMutation(SIGNIN);
  let history = useHistory();
  console.log(data);
  console.log(error);
  // console.log(typeof error);
  // if (error) {
  //   const { message } = error;
  //   console.log(message);
  // }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    signin({
      variables: {
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
      if (data.signin.token) {
        localStorage.setItem("token", data.signin.token);
        localStorage.setItem("user-name", data.signin.user.name);
        localStorage.setItem("user-id", data.signin.user.id);
        history.push(`/schools`);
        window.location.reload();
      }
    }
  }, [data, history]);

  return (
    <div>
      <Form>
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
          Signin
        </Button>
      </Form>
    </div>
  );
}
