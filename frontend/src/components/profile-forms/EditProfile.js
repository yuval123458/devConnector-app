import { Fragment } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createProfile } from "../../reducers/profile-slice";
import { useSelector } from "react-redux";
import { getCurrentProfile } from "../../reducers/profile-slice";
import { useEffect } from "react";
import { useRef } from "react";
import { alertActions } from "../../reducers/alert-slice";
import LoadingSpinner from "../layout/LoadingSpinner";

const initialState = {
  company: "",
  website: "",
  location: "",
  status: "",
  skills: "",
  githubusername: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedIn: "",
  youtube: "",
  instagram: "",
};

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileRef = useRef(null);
  const errorRef = useRef();
  const [loading, setLoading] = useState(true);
  const errors = useSelector((state) => state.profile.errors);
  errorRef.current = errors;
  console.log(errors);
  console.log("loading: " + loading);
  let profile;
  const [profileForm, setProfileForm] = useState(initialState);
  const [media, setMedia] = useState(false);
  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    youtube,
    linkedIn,
    facebook,
    twitter,
    instagram,
  } = profileForm;

  console.log(profileForm);

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setProfileForm((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    console.log(profileForm);

    const body = { profileForm, edit: true };

    dispatch(createProfile(body));

    navigate("/dashboard");
  };

  useEffect(() => {
    const setProfile = async () => {
      profile = await dispatch(getCurrentProfile()).unwrap();
      console.log(profile);
      profileRef.current = profile;

      const formData = { ...initialState };

      for (const key in profile) {
        if (key in formData) {
          formData[key] = profile[key];
          console.log(profile[key]);
        }
      }

      for (const key in profile.social) {
        if (key in formData) {
          formData[key] = profile.social[key];
        }
      }

      setProfileForm(formData);

      console.log("use effect");
      setLoading(false);
    };

    setProfile();
  }, []);

  return (
    <div>
      {loading && <LoadingSpinner />}
      {profile !== null && !loading && (
        <Fragment>
          <h1 className="large text-primary">Update Your Profile</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Let's get some information to make
            your profile stand out
          </p>
          <small>* = required field</small>
          <form onSubmit={submitHandler} className="form">
            <div className="form-group">
              <select value={status} onChange={changeHandler} name="status">
                <option value="">* Select Professional Status</option>
                <option value="Developer">Developer</option>
                <option value="Junior Developer">Junior Developer</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Manager">Manager</option>
                <option value="Student or Learning">Student or Learning</option>
                <option value="Instructor">Instructor or Teacher</option>
                <option value="Intern">Intern</option>
                <option value="Other">Other</option>
              </select>
              <small className="form-text">
                Give us an idea of where you are at in your career
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Company"
                name="company"
                value={company}
                onChange={changeHandler}
              />
              <small className="form-text">
                Could be your own company or one you work for
              </small>
            </div>
            <div className="form-group">
              <input
                value={website}
                onChange={changeHandler}
                type="text"
                placeholder="Website"
                name="website"
              />
              <small className="form-text">
                Could be your own or a company website
              </small>
            </div>
            <div className="form-group">
              <input
                value={location}
                onChange={changeHandler}
                type="text"
                placeholder="Location"
                name="location"
              />
              <small className="form-text">
                City & state suggested (eg. Boston, MA)
              </small>
            </div>
            <div className="form-group">
              <input
                value={skills}
                onChange={changeHandler}
                type="text"
                placeholder="* Skills"
                name="skills"
              />
              <small className="form-text">
                Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
              </small>
            </div>
            <div className="form-group">
              <input
                value={githubusername}
                onChange={changeHandler}
                type="text"
                placeholder="Github Username"
                name="githubusername"
              />
              <small className="form-text">
                If you want your latest repos and a Github link, include your
                username
              </small>
            </div>
            <div className="form-group">
              <textarea
                value={bio}
                onChange={changeHandler}
                placeholder="A short bio of yourself"
                name="bio"
              ></textarea>
              <small className="form-text">
                Tell us a little about yourself
              </small>
            </div>

            <div className="my-2">
              <button
                onClick={() => setMedia((prev) => !prev)}
                type="button"
                className="btn btn-light"
              >
                {!media ? "Add Social Network Links" : "Hide"}
              </button>
              <span>Optional</span>
            </div>
            {media && (
              <Fragment>
                <div className="form-group social-input">
                  <i className="fab fa-twitter fa-2x"></i>
                  <input
                    value={twitter}
                    onChange={changeHandler}
                    type="text"
                    placeholder="Twitter URL"
                    name="twitter"
                  />
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-facebook fa-2x"></i>
                  <input
                    value={facebook}
                    onChange={changeHandler}
                    type="text"
                    placeholder="Facebook URL"
                    name="facebook"
                  />
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-youtube fa-2x"></i>
                  <input
                    value={youtube}
                    onChange={changeHandler}
                    type="text"
                    placeholder="YouTube URL"
                    name="youtube"
                  />
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-linkedin fa-2x"></i>
                  <input
                    value={linkedIn}
                    onChange={changeHandler}
                    type="text"
                    placeholder="LinkedIn URL"
                    name="linkedIn"
                  />
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-instagram fa-2x"></i>
                  <input
                    value={instagram}
                    onChange={changeHandler}
                    type="text"
                    placeholder="Instagram URL"
                    name="instagram"
                  />
                </div>
              </Fragment>
            )}

            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/dashboard">
              Go Back
            </Link>
          </form>
        </Fragment>
      )}
    </div>
  );
};
export default EditProfile;
