import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { addEducation } from "../../reducers/profile-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { alertActions } from "../../reducers/alert-slice";

const AddEducation = () => {
  const errors = useSelector((state) => state.profile.errors);
  const errorRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  errorRef.current = errors;
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDisabled, toggleDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  const changeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "current") {
      toggleDisabled((prev) => !prev);
    }

    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await dispatch(addEducation(formData)).unwrap();

      if (!errorRef.current) {
        dispatch(
          alertActions.setAlert({
            msg: "successfully added experience",
            alertType: "success",
          })
        );

        navigate("/dashboard");
      }
    } catch (error) {}
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or bootcamp you
        have attended
      </p>
      <small>* = required field</small>
      <form onSubmit={submitHandler} className="form">
        <div className="form-group">
          <input
            onChange={changeHandler}
            type="text"
            placeholder="* school"
            name="school"
            value={school}
          />
        </div>
        <div className="form-group">
          <input
            onChange={changeHandler}
            type="text"
            placeholder="* degree"
            name="degree"
            value={degree}
          />
        </div>
        <div className="form-group">
          <input
            onChange={changeHandler}
            type="text"
            placeholder="Field of study"
            name="fieldofstudy"
            value={fieldofstudy}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            onChange={changeHandler}
            type="date"
            name="from"
            value={from}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              onChange={changeHandler}
              type="checkbox"
              checked={current}
              name="current"
              value={current}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            disabled={toDisabled ? "disabled" : ""}
            onChange={changeHandler}
            type="date"
            name="to"
            value={to}
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={changeHandler}
            name="description"
            cols="30"
            rows="5"
            placeholder="Education Description"
            value={description}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};
export default AddEducation;
