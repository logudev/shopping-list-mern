import React from "react";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import { logoutUser } from "../../redux/actions/authActions";

const Logout = ({ logoutUser, isAuthenticated }) => {
  return (
    <>
      <NavLink onClick={logoutUser} href="#">
        Logout
      </NavLink>
    </>
  );
};

export default connect(null, { logoutUser })(Logout);
