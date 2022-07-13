import { useEffect } from "react";
import { useSelector } from "react-redux";
import { deleteAcc, getCurrentProfile } from "../../reducers/profile-slice";
import { useDispatch } from "react-redux";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import LoadingSpinner from "../layout/LoadingSpinner";

const Dashboard = (props) => {
  const profile = useSelector((state) => state.profile.profile);
  console.log(profile);
  const isLoading = useSelector((state) => state.profile.loading);
  console.log("loading " + isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProfile = async () => {
      await dispatch(getCurrentProfile()).unwrap();
    };

    getProfile();
  }, [dispatch]);

  const deleteHandler = async () => {
    await dispatch(deleteAcc()).unwrap();
  };

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && profile !== null && (
        <Fragment>
          <h1 className="large text-primary"> Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome {profile.user.name}
          </p>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-2">
            <button onClick={deleteHandler} className="btn btn-danger">
              <i className="fas fa-user-minus"></i> DELETE MY ACCOUNT
            </button>
          </div>
        </Fragment>
      )}
      {!isLoading && profile === null && (
        <Fragment>
          <p>you do not have a profile yet. Please create One</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </div>
  );
};
export default Dashboard;
