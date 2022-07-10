import { Fragment } from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEdc } from "../../reducers/profile-slice";

const Education = (props) => {
  const { education } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const educations = education.map((edc) => (
    <tr key={edc._id}>
      <td>{edc.school}</td>
      <td className="hide-sm">{edc.degree}</td>
      <td className="hide-sm">{edc.fieldofstudy}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edc.from}</Moment> -
        {edc.to === null ? (
          " NOW"
        ) : (
          <Moment format="YYYY/MM/DD">{edc.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => deleteHandler(edc._id)}
          className="btn btn-danger"
        >
          DELETE
        </button>
      </td>
    </tr>
  ));

  const deleteHandler = async (edcId) => {
    try {
      await dispatch(deleteEdc(edcId)).unwrap();

      navigate("/dashboard");
    } catch (error) {}
  };

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      {education.length === 0 && <p>you do not have any education.</p>}
      {education.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th className="hide-sm">School</th>
              <th className="hide-sm">Degree or Certificate</th>
              <th className="hide-sm">Field Of Study</th>
              <th className="hide-sm">Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      )}
    </Fragment>
  );
};
export default Education;
