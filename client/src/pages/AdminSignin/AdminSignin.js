import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SIGNIN = gql`
  mutation AdminSignin($email: String!, $password: String!) {
    adminSignin(email: $email, password: $password) {
      message
      admin {
        id
        name
      }
      token
    }
  }
`;

export default function AdminSignin() {
  const [signin, { data, error }] = useMutation(SIGNIN);

  const history = useHistory();

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
      if (data.adminSignin.token) {
        localStorage.setItem("token", data.adminSignin.token);
        localStorage.setItem("user-name", data.adminSignin.admin.name);
        localStorage.setItem("user-id", data.adminSignin.admin.id);
        history.push(`/admin-schools`);
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
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Admin Password"
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
