import { Link } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../reducers/auth-slice";
import { profileActions } from "../../reducers/profile-slice";

const NavBar = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.RegisterFail());
    dispatch(profileActions.clearProfile());
  };

  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/" onClick={logoutHandler}>
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  const loading = useSelector((state) => state.auth.isLoading);
  console.log("loading " + loading);
  const isAuth = useSelector((state) => state.auth.isAuth);
  console.log("auth " + isAuth);
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && (isAuth ? authLinks : guestLinks)}
    </nav>
  );
};
export default NavBar;
