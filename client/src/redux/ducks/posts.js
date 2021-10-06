import * as api from "../../api";

const CREATE_POST = "createPost";
const UPDATE_POST = "updatePost";
const LIKE_POST = "likePost";
const DELETE_POST = "deletePost";
const GET_POSTS = "getPosts";
const SET_ID = "setId";

export const getPosts = () => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.fetchPostsApi();

    dispatch({ type: GET_POSTS, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.createPostApi(post);

    dispatch({ type: CREATE_POST, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (post) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.updatePostApi(post);

    dispatch({ type: UPDATE_POST, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const likePost = (id, type) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.likePostApi(id, type);

    dispatch({ type: LIKE_POST, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.deletePostApi(id);

    dispatch({ type: DELETE_POST, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const setId = (id) => ({ type: SET_ID, payload: id });

const reducer = (state = { posts: [], currentId: undefined }, action) => {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.payload };

    case CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };

    case UPDATE_POST:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };

    case LIKE_POST:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };

    case DELETE_POST:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };

    case SET_ID:
      return { ...state, currentId: action.payload };

    default:
      return state;
  }
};

export default reducer;
