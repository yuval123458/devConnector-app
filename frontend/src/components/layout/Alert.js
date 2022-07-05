import { useSelector } from "react-redux";
import React from "react";
import { alertActions } from "../../reducers/alert-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Alert = () => {
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.alerts.alerts);
  let alertId;

  useEffect(() => {
    if (alerts && alerts.length > 0 && alertId) {
      console.log(alerts);
      setTimeout(() => {
        console.log("delete alert");
        dispatch(alertActions.removeAlert(alertId));
      }, 3000);
    }
  }, [alerts, alertId, dispatch]);

  if (alerts && alerts.length > 0) {
    console.log("alert did mount ");
    return (
      <div className="alert">
        {alerts.map((alert) => {
          alertId = alert.id;
          return (
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
              {alert.msg}
            </div>
          );
        })}
      </div>
    );
  }
};
export default Alert;
