import axios from "axios";

const SERVER_URI = "https://the-wall-01.herokuapp.com";

export const fetchPostsApi = () => axios.get(`${SERVER_URI}/api/post`);

export const createPostApi = (post) =>
  axios.post(`${SERVER_URI}/api/post/create`, post, { headers: { authorization: localStorage.getItem("token") } });

export const updatePostApi = (post) =>
  axios.patch(`${SERVER_URI}/api/post/update/${post._id}`, post, {
    headers: { authorization: localStorage.getItem("token") },
  });

export const likePostApi = (id, type) =>
  axios.patch(
    `${SERVER_URI}/api/post/like/${id}`,
    { type },
    { headers: { authorization: localStorage.getItem("token") } }
  );

export const deletePostApi = (id) =>
  axios.delete(`${SERVER_URI}/api/post/delete/${id}`, { headers: { authorization: localStorage.getItem("token") } });

export const getUserApi = () =>
  axios.get(`${SERVER_URI}/api/user`, { headers: { authorization: localStorage.getItem("token") } });

export const loginUserApi = (name) => axios.post(`${SERVER_URI}/api/user/`, { name });

export const createUserApi = (name) => axios.post(`${SERVER_URI}/api/user/create`, { name });
