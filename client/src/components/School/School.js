import React from "react";
import "./School.css";
import { gql, useMutation } from "@apollo/client";
import UpdateSchoolModal from "../../components/UpdateSchoolModal/UpdateSchoolModal";
import DeleteSchoolModal from "../../components/DeleteSchoolModal/DeleteSchoolModal";

const ACTIVE_SCHOOL = gql`
  mutation ActiveSchool($schoolId: ID!) {
    schoolInfoActiveStatus(schoolId: $schoolId, active: true) {
      name
    }
  }
`;

const INACTIVE_SCHOOL = gql`
  mutation InActiveSchool($schoolId: ID!) {
    schoolInfoActiveStatus(schoolId: $schoolId, active: false) {
      name
    }
  }
`;

export default function School({
  name,
  address,
  email,
  contact,
  date,
  user,
  active,
  id,
  adminProfile,
  userProfile,
  schoolAdmin,
  usersId,
}) {
  const [activeSchool, { data, loading }] = useMutation(ACTIVE_SCHOOL);
  const [inActiveSchool, { data: inActiveData, loading: inActiveLoading }] =
    useMutation(INACTIVE_SCHOOL);

  const formatedDate = new Date(date);
  return (
    <div className="School">
      {adminProfile && active === false && (
        <button
          className="School__inactive"
          onClick={() => {
            activeSchool({
              variables: {
                schoolId: id,
              },
            });
          }}
        >
          Inactive
        </button>
      )}
      {adminProfile && active === true && (
        <button
          className="School__active"
          onClick={() => {
            inActiveSchool({
              variables: {
                schoolId: id,
              },
            });
          }}
        >
          Active
        </button>
      )}
      <div className="School__header-container">
        <h2>{name}</h2>
        <h4>
          Created At {`${formatedDate}`.split(" ").splice(0, 4).join(" ")} by{" "}
          {user}
        </h4>
      </div>
      <p>Location: {address}</p>
      <p>id: {id}</p>
      <p>Email: {email}</p>
      <p>Contact: {contact}</p>
      <div>
        {userProfile ? (
          <UpdateSchoolModal
            schoolId={id}
            schoolName={name}
            schoolAddress={address}
            schoolEmail={email}
            schoolContact={contact}
          />
        ) : null}
      </div>
      &nbsp;&nbsp;&nbsp;
      <div color="red">
        {userProfile ? (
          <DeleteSchoolModal
            schoolId={id}
            schoolName={name}
            schoolAddress={address}
            schoolEmail={email}
            schoolContact={contact}
          />
        ) : null}
      </div>
    </div>
  );
}
