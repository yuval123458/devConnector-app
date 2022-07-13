import { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles } from "../reducers/profile-slice";
import ProfileItem from "./ProfileItem";
import LoadingSpinner from "../components/layout/LoadingSpinner";

const Profiles = () => {
  const profiles = useSelector((state) => state.profile.profiles);
  console.log(profiles);
  const loading = useSelector((state) => state.profile.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProfiles = async () => {
      await dispatch(getAllProfiles()).unwrap();
    };

    getProfiles();
  }, [dispatch]);

  return (
    <Fragment>
      {(loading || !profiles) && <LoadingSpinner />}
      {!loading && profiles && (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i>Browse and connect with
            other developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found.</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Profiles;
