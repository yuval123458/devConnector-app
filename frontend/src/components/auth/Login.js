import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHttp";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const { sendRequest } = useHttp();

  const { email, password } = formData;

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  const submitHandler = (e) => {
    e.preventDefault();
    sendRequest(
      "http://localhost:5000/api/auth",
      {
        email,
        password,
      },
      "post"
    );
  };

  return (
    <Fragment>
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>

      <section className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign Into Your Account
        </p>
        <form className="form" onSubmit={submitHandler}>
          <div className="form-group">
            <input
              onChange={changeHandler}
              value={email}
              type="email"
              placeholder="Email Address"
              name="email"
            />
          </div>
          <div className="form-group">
            <input
              onChange={changeHandler}
              value={password}
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    </Fragment>
  );
};
export default Login;
