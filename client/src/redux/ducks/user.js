import * as api from "../../api";
import { error } from "react-toastify-redux";

const GET_USER = "getUser";
const LOGIN_USER = "loginUser";
const CREATE_USER = "createUser";
const LOGOUT_USER = "logoutUser";

export const getUser = () => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.getUserApi();

    dispatch({ type: GET_USER, payload: data });
  } catch (err) {
    dispatch(error(err.response.data.error));
    dispatch(logoutUser());
  }
};

export const loginUser = (name) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.loginUserApi(name);

    dispatch({ type: LOGIN_USER, payload: { token: data, name } });
  } catch (err) {
    dispatch(error(err.response.data.error));
  }
};

export const createUser = (name) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.createUserApi(name);

    dispatch({ type: CREATE_USER, payload: { token: data, name } });
  } catch (err) {
    dispatch(error(err.response.data.error || err.message));
  }
};

export const logoutUser = () => ({ type: LOGOUT_USER });

const reducer = (user = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...action.payload };

    case LOGIN_USER:
      localStorage.setItem("token", action.payload.token);
      return { ...user, name: action.payload.name };

    case CREATE_USER:
      localStorage.setItem("token", action.payload.token);
      return { ...user, name: action.payload.name };

    case LOGOUT_USER:
      localStorage.removeItem("token");
      return {};

    default:
      return { ...user };
  }
};

export default reducer;
