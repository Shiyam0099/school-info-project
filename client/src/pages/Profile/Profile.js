import { useQuery, gql } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import AddSchoolModal from "../../components/AddSchoolModal/AddSchoolModal";
import UpdateProfileModal from "../../components/UpdateProfileModal/UpdateProfileModal";
import DeleteProfileModal from "../../components/DeleteProfileModal/DeleteProfileModal";
import School from "../../components/School/School";
import Loader from "../../components/Loader/Loader";

const GET_PROFILE = gql`
  query GetProfile($userId: ID!) {
    users(id: $userId) {
      name
      id
      email
      userProfile
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

export default function Profile() {
  const { id } = useParams();

  const { data, error, loading } = useQuery(GET_PROFILE, {
    variables: {
      userId: id,
    },
  });

  if (error) return <div>Something went wrong! </div>;

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

  console.log(data);

  const { users } = data;
  const user = users[0];

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
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <div>
            {user.userProfile ? (
              <UpdateProfileModal
                userId={user.id}
                userName={user.name}
                userEmail={user.email}
              />
            ) : null}

            <div>
              {user.userProfile ? (
                <DeleteProfileModal
                  userId={user.id}
                  userName={user.name}
                  userEmail={user.email}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div>{user.userProfile ? <AddSchoolModal /> : null}</div>
      </div>
      <div>
        {user.school.map((school) => {
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
              adminProfile={false}
              id={school.id}
              userProfile={user.userProfile}
            />
          );
        })}
      </div>
    </div>
  );
}
