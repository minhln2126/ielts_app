import { constants as c } from "../constants";
function getAllPosts() {
  let requestOption = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch(`${c.apiUrl}/posts`, requestOption)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
function getTrendingPosts() {
  let requestOption = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch(`${c.apiUrl}/posts/hot`, requestOption)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
function createPost(info) {
  let requestOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: JSON.parse(localStorage.getItem("token")),
    },
    body: JSON.stringify(info),
  };
  return fetch(`${c.apiUrl}/posts`, requestOption)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
function getPostById(id) {
  let requestOption = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch(`${c.apiUrl}/posts/${id}`, requestOption)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
function commentPost(id, info) {
  let requestOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: JSON.parse(localStorage.getItem("token")),
    },
    body: JSON.stringify(info),
  };
  return fetch(`${c.apiUrl}/posts/comment/${id}`, requestOption)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
function likePost(id) {
  let requestOption = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: JSON.parse(localStorage.getItem("token")),
    },
  };
  return fetch(`${c.apiUrl}/posts/like/${id}`, requestOption)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
function dislikePost(id) {
  let requestOption = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: JSON.parse(localStorage.getItem("token")),
    },
  };
  return fetch(`${c.apiUrl}/posts/dislike/${id}`, requestOption)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
function likeComment(id) {
  let requestOption = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: JSON.parse(localStorage.getItem("token")),
    },
  };
  return fetch(`${c.apiUrl}/comments/like/${id}`, requestOption)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
function dislikeComment(id) {
  let requestOption = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: JSON.parse(localStorage.getItem("token")),
    },
  };
  return fetch(`${c.apiUrl}/comments/dislike/${id}`, requestOption)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
export const postServices = {
  likePost,
  createPost,
  getPostById,
  commentPost,
  getAllPosts,
  dislikePost,
  likeComment,
  dislikeComment,
  getTrendingPosts,
};
