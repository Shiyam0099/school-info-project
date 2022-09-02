import React from "react";
import { useHistory } from "react-router-dom";
import "./User.css";
import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";
import { Button } from "react-bootstrap";

export default function User({ id, name, email, date, adminProfile }) {
  const history = useHistory();

  const formatedDate = new Date(date);
  return (
    <div className="School">
      <div className="User__header-container">
        <h2>{name}</h2>
        <h4>Joined at {`${formatedDate}`.split(" ").splice(0, 4).join(" ")}</h4>
      </div>
      <div>
        <p>id: {id}</p>
        <p>Email: {email}</p>
        <div>
          {adminProfile ? (
            <DeleteUserModal userId={id} userName={name} userEmail={email} />
          ) : null}
        </div>
        <Button
          variant="select"
          onClick={() => {
            history.push(`/profile/${id}`);
          }}
        >
          User Profile
        </Button>
      </div>
    </div>
  );
}
