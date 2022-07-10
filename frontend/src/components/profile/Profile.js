import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileById } from "../../reducers/profile-slice";
import { Link, useParams } from "react-router-dom";
import { Fragment } from "react";
import ProfileAbout from "./ProfileAbout";
import ExpItem from "./ExpItem";
import EdcItem from "./EdcItem";
import ProfileTop from "./ProfileTop";
import ProfileGithub from "./ProfileGithub";

const Profile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const profile = useSelector((state) => state.profile.profile);

  const user = useSelector((state) => state.auth.user);
  console.log(profile);
  const { userId } = params;
  useEffect(() => {
    const profileById = async () => {
      await dispatch(getProfileById(userId)).unwrap();
    };

    profileById();
  }, []);

  return (
    <Fragment>
      {profile === null && <p>loading...</p>}
      {profile && user && (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {user.user._id === profile.user._id && (
            <Link className="btn btn-dark" to="/edit-profile">
              EDIT
            </Link>
          )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((exp) => (
                    <ExpItem key={exp._id} exp={exp} />
                  ))}
                </Fragment>
              ) : (
                <h4>No Experience Credentials</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((edc) => (
                    <EdcItem key={edc._id} edc={edc} />
                  ))}
                </Fragment>
              ) : (
                <h4>No Education Credentials</h4>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Profile;
