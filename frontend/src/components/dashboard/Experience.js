import { Fragment } from "react";
import Moment from "react-moment";
import { deleteExp } from "../../reducers/profile-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Experience = (props) => {
  const { experience } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(experience);

  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
        {exp.to === null ? (
          " NOW"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => deleteHandler(exp._id)}
          className="btn btn-danger"
        >
          DELETE
        </button>
      </td>
    </tr>
  ));

  const deleteHandler = async (expId) => {
    try {
      await dispatch(deleteExp(expId)).unwrap();

      navigate("/dashboard");
    } catch (error) {}
  };

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      {experience.length === 0 && <p>you do not have any experiences.</p>}
      {experience.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th className="hide-sm">Company</th>
              <th className="hide-sm">Title</th>
              <th className="hide-sm">Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      )}
    </Fragment>
  );
};
export default Experience;
