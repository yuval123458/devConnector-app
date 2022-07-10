import { Fragment } from "react";

const ProfileAbout = (props) => {
  const { profile } = props;
  return (
    <div className="profile-about bg-light p-2">
      {profile.bio && (
        <Fragment>
          <h2 className="text-primary">{profile.user.name}'s Bio</h2>
          <p>{profile.bio}</p>
        </Fragment>
      )}

      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {profile.skills.map((skill, Index) => (
          <div key={Index} className="p-1">
            <i className="fa fa-check"></i>
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProfileAbout;
