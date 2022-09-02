import { useQuery, gql } from "@apollo/client";
import React from "react";
import Loader from "../../components/Loader/Loader";
import User from "../../components/User/User";

const GET_PROFILE = gql`
  query {
    users {
      name
      id
      email
      createdAt
    }
  }
`;

export default function AdminUsers() {
  const { data, error, loading } = useQuery(GET_PROFILE);

  if (error) return <div>Something went wrong!</div>;

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

  console.log(data);

  const { users } = data;

  return (
    <div>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex ",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>Admin Panel</h1>
          <p>User Delete Page</p>
        </div>
      </div>
      <div>
        {users.map((user) => {
          return (
            <User
              key={user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              date={user.createdAt}
              adminProfile={true}
            />
          );
        })}
      </div>
    </div>
  );
}
