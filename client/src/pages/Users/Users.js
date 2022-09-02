import React from "react";
import User from "../../components/User/User";
import { useQuery, gql } from "@apollo/client";
import Loader from "../../components/Loader/Loader";

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
      userProfile
      createdAt
    }
  }
`;

export default function Users() {
  const { error, loading, data } = useQuery(GET_USERS);

  if (error) return <div>Something went wrong!</div>;

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

  const { users } = data;

  return (
    <div>
      {users.map((user) => {
        return (
          <User
            key={user.id}
            name={user.name}
            id={user.id}
            email={user.email}
            date={user.createdAt}
          />
        );
      })}
    </div>
  );
}
