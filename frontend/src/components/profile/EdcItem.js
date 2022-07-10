import Moment from "react-moment";

const EdcItem = (props) => {
  const { edc } = props;

  return (
    <div>
      <h3 className="text-dark">{edc.school}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{edc.from}</Moment> -{" "}
        {edc.to ? <Moment format="YYYY/MM/DD">{edc.to}</Moment> : "current"}
      </p>
      <p>
        <strong>Degree: {edc.degree} </strong>
        {}
      </p>
      <p>
        <strong>Field Of Study: {edc.fieldofstudy} </strong>
        {}
      </p>
      <p>
        <strong>Description: </strong>
        {edc.description}
      </p>
    </div>
  );
};
export default EdcItem;
