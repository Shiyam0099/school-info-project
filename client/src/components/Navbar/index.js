import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
  const userName = localStorage.getItem("user-name");
  const userId = localStorage.getItem("user-id");

  const logout = () => {
    localStorage.clear();
    localStorage.setItem("token", "");
  };
  return (
    <>
      <Nav>
        <NavLink to="/">
          <img
            src="https://icons.iconarchive.com/icons/inipagi/job-seeker/64/graduate-icon.png"
            alt="logo"
          />
        </NavLink>
        <Bars />
        <NavMenu>
          {userName === "Admin" ? (
            <NavLink to="/admin-schools" activeStyle>
              Schools
            </NavLink>
          ) : (
            <NavLink to="/schools" activeStyle>
              Schools
            </NavLink>
          )}
          {userName === "Admin" ? (
            <NavLink to="/admin-users" activeStyle>
              Users
            </NavLink>
          ) : (
            <NavLink to="/users" activeStyle>
              Users
            </NavLink>
          )}
          {userId ? (
            userName === "Admin" ? (
              <NavLink to={`/admin-schools`} activeStyle>
                {userName}
              </NavLink>
            ) : (
              <NavLink to={`/profile/${userId}`} activeStyle>
                {userName}
              </NavLink>
            )
          ) : (
            <NavLink to="/about-us" activeStyle>
              About Us
            </NavLink>
          )}
          {userId ? (
            <NavLink to="/about-us" activeStyle>
              About Us
            </NavLink>
          ) : (
            <NavLink to="/signup" activeStyle>
              Sign Up
            </NavLink>
          )}
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        {userName ? (
          userName === "Admin" ? (
            <NavBtn>
              <NavBtnLink to="/admin-signin" onClick={logout}>
                Sign Out
              </NavBtnLink>
            </NavBtn>
          ) : (
            <NavBtn>
              <NavBtnLink to="/signin" onClick={logout}>
                Sign Out
              </NavBtnLink>
            </NavBtn>
          )
        ) : (
          <NavBtn>
            <NavBtnLink to="/signin">Sign In</NavBtnLink>
          </NavBtn>
        )}
      </Nav>
    </>
  );
};

export default Navbar;
