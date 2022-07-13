import { getGithubRepos } from "../../reducers/profile-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Fragment } from "react";
import LoadingSpinner from "../layout/LoadingSpinner";

const ProfileGithub = (props) => {
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.profile.repos);

  console.log(repos);

  const { username } = props;

  console.log(username);

  useEffect(() => {
    dispatch(getGithubRepos(username));
  }, []);
  return (
    <Fragment>
      {!repos && <LoadingSpinner />}
      {repos && (
        <div className="profile-github">
          <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>
          {repos.map((repo) => (
            <div key={repo.id} className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>
                  {repo.description
                    ? repo.description
                    : "NO DESCRIPTION FOUND."}
                </p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">
                    Stars: {repo.stargazers_count}
                  </li>
                  <li className="badge badge-dark">
                    Watchers: {repo.watchers_count}
                  </li>
                  <li className="badge badge-light">
                    Forks: {repo.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};
export default ProfileGithub;
