import { Link } from "react-router-dom";

const ProfileItem = (props) => {
  const { profile } = props;
  const { _id: userId, name, avatar } = profile.user;

  const { status, company, location, skills } = profile;

  return (
    <div className="profile bg-light">
      <img className="round-img" src={avatar} alt="avatar-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span>at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link className="btn btn-primary" to={`/profile/${userId}`}>
          View Profile
        </Link>
      </div>
      <div>
        <ul>
          {skills.map((skill, Index) => (
            <li key={Index}>
              <i className="fas fa-check"></i>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ProfileItem;
