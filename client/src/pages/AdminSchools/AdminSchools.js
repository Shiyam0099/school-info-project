import { useQuery, gql } from "@apollo/client";
import React from "react";
import Loader from "../../components/Loader/Loader";
import School from "../../components/School/School";

const GET_PROFILE = gql`
  query {
    users {
      name
      id
      school {
        id
        name
        contact
        email
        address
        active
        createdAt
      }
    }
  }
`;

export default function Admin() {
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
          <p>School status update page</p>
        </div>
      </div>
      <div>
        {users.map((user) => {
          return user.school.map((school) => {
            return (
              <School
                key={school.id}
                name={school.name}
                address={school.address}
                email={school.email}
                contact={school.contact}
                date={school.createdAt}
                user={user.name}
                active={school.active}
                adminProfile={true}
                id={school.id}
              />
            );
          });
        })}
      </div>
    </div>
  );
}
