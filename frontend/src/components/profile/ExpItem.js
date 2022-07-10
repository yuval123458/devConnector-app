import Moment from "react-moment";

const ExpItem = (props) => {
  const { exp } = props;

  return (
    <div>
      <h3 className="text-dark">{exp.company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> : "current"}
      </p>
      <p>
        <strong>Position: {exp.title} </strong>
        {}
      </p>
      <p>
        <strong>Description: </strong>
        {exp.description}
      </p>
    </div>
  );
};
export default ExpItem;
