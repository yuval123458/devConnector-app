import axios from "axios";
import { authActions } from "../reducers/auth-slice";
import { useDispatch } from "react-redux";
import { alertActions } from "../reducers/alert-slice";
import { useCallback } from "react";

const useHttp = () => {
  const dispatch = useDispatch();

  const setAuthUser = useCallback(async () => {
    if (localStorage.getItem("token")) {
      try {
        const response = await axios.get("http://localhost:5000/api/auth", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });

        console.log(response.data);

        dispatch(authActions.loadUser(response.data));
      } catch (error) {
        dispatch(
          alertActions.setAlert({
            msg: error.response.data.message,
            alertType: "danger",
          })
        );
        console.log(error.response.data.message);
        dispatch(authActions.RegisterFail());
      }
    }
  }, [dispatch]);

  const sendRequest = useCallback(
    async (url, body, method) => {
      try {
        const response = await axios[method](url, body);

        console.log(response);

        dispatch(authActions.RegisterSuccess({ token: response.data.token }));
      } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
          errors.map((error) =>
            dispatch(
              alertActions.setAlert({
                msg: error.msg,
                alertType: "danger",
              })
            )
          );
        }
        dispatch(authActions.RegisterFail());
      }
      setAuthUser();
    },
    [dispatch, setAuthUser]
  );

  return { setAuthUser, sendRequest };
};
export default useHttp;
