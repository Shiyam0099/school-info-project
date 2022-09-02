import React from "react";
import School from "../../components/School/School";
import { useQuery, gql } from "@apollo/client";
import Loader from "../../components/Loader/Loader";

const GET_SCHOOLS = gql`
  query {
    schools {
      id
      name
      contact
      email
      address
      schoolAdmin {
        name
      }
      createdAt
    }
  }
`;

export default function Schools() {
  const { error, loading, data } = useQuery(GET_SCHOOLS);

  if (error) return <div>Something went wrong!</div>;

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

  const { schools } = data;

  return (
    <div>
      {schools.map((school) => {
        return (
          <School
            key={school.id}
            name={school.name}
            address={school.address}
            email={school.email}
            contact={school.contact}
            date={school.createdAt}
            id={school.id}
            user={school.schoolAdmin.name}
          />
        );
      })}
    </div>
  );
}
