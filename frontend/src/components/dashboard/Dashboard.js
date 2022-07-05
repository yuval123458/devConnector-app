import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCurrentProfile } from "../../reducers/profile-slice";
import { useDispatch } from "react-redux";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";

const Dashboard = (props) => {
  const profile = useSelector((state) => state.profile.profile);
  console.log(profile);
  const isLoading = useSelector((state) => state.profile.loading);
  console.log("loading " + isLoading);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("getCurrentProfile");
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <p>loading...</p>}
      {!isLoading && profile && (
        <Fragment>
          <h1 className="large text-primary"> Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome {user.user.name}
          </p>
          <DashboardActions />
        </Fragment>
      )}
      {!isLoading && !profile && (
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
