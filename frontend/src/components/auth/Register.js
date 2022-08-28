import { useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { alertActions } from "../../reducers/alert-slice";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const { name, email, password, password2 } = formData;

  const { sendRequest } = useHttp();

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== password2) {
      dispatch(
        alertActions.setAlert({
          msg: "passwords do not match!",
          alertType: "danger",
        })
      );
    } else {
      const response = sendRequest(
        process.env.REACT_APP_BACKEND_URL,
        {
          name,
          email,
          password,
        },
        "post"
      );
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
  }, [isAuth]);

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" onSubmit={submitHandler}>
          <div className="form-group">
            <input
              onChange={changeHandler}
              value={name}
              type="text"
              placeholder="Name"
              name="name"
            />
          </div>
          <div className="form-group">
            <input
              onChange={changeHandler}
              value={email}
              type="email"
              placeholder="Email Address"
              name="email"
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              onChange={changeHandler}
              value={password}
              type="password"
              placeholder="Password"
              name="password"
            />
          </div>
          <div className="form-group">
            <input
              onChange={changeHandler}
              value={password2}
              type="password"
              placeholder="Confirm Password"
              name="password2"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};
export default Register;
