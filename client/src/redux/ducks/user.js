import * as api from "../../api";
import { error, success } from "react-toastify-redux";

const GET_USER = "getUser";
const LOGIN_USER = "loginUser";
const LOGOUT_USER = "logoutUser";

export const getUser = () => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.getUserApi();

    dispatch({ type: GET_USER, payload: data });
  } catch (err) {
    dispatch(error(err.response.data.error || err.message));
    dispatch(logoutUser());
  }
};

export const loginUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.loginUserApi(user);

    dispatch({ type: LOGIN_USER, payload: { token: data.token, username: user.username } });
  } catch (err) {
    dispatch(error(err.response.data.error || err.message));
  }
};

export const createUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.createUserApi(user);

    dispatch(success(data.message));
  } catch (err) {
    dispatch(error(err.response.data.error || err.message));
  }
};

export const activateUser = (activateToken) => async (dispatch) => {
  try {
    const { data } = await api.activateUserApi(activateToken);

    dispatch(success(data.message));
  } catch (err) {
    dispatch(error(err.response.data.error || err.message));
  }
};

export const forgotPasswordUser = (email) => async (dispatch) => {
  try {
    const { data } = await api.forgotPasswordUserApi(email);

    dispatch(success(data.message));
  } catch (err) {
    dispatch(error(err.response.data.error || err.message));
  }
};

export const resetPasswordUser =
  ({ password, resetToken }) =>
  async (dispatch) => {
    try {
      const { data } = await api.resetPasswordUserApi({ resetToken, password });

      dispatch(success(data.message));
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
      return { ...user, username: action.payload.username };

    case LOGOUT_USER:
      localStorage.removeItem("token");
      return {};

    default:
      return { ...user };
  }
};

export default reducer;
