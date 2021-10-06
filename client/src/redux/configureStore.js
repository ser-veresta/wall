import { combineReducers, applyMiddleware, createStore } from "redux";
import { toastsReducer as toasts } from "react-toastify-redux";
import thunk from "redux-thunk";
import modalReducer from "./ducks/modal";
import postsReducer from "./ducks/posts";
import userReducer from "./ducks/user";

const reducer = combineReducers({ modalReducer, postsReducer, userReducer, toasts });

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
