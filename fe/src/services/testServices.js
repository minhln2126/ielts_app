import { constants as c } from "../constants";

function getTestById(id) {
  let requestOption = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(`${c.apiUrl}/tests/${id}`, requestOption)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

function getTest(query) {
  let queryString = Object.keys(query).reduce((rs, v) => {
    return rs + `${v}=${query[v]}&`;
  }, "?");

  queryString = queryString.substr(0, queryString.length - 1);

  return fetch(`${c.apiUrl}/tests${queryString}`)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    });
}

function addTest(test) {
  let requestOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(test),
  };
  return fetch(`${c.apiUrl}/tests`, requestOption)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    });
}

function deleteTest(id) {
  let requestOption = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: JSON.parse(localStorage.getItem("token")),
    },
  };
  return fetch(`${c.apiUrl}/tests/${id}`, requestOption)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    });
}

function updateTest(id, test) {
  let requestOption = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: JSON.parse(localStorage.getItem("token")),
    },
    body: JSON.stringify(test),
  };
  console.log(test);
  return fetch(`${c.apiUrl}/tests/${id}`, requestOption)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    });
}

export const testService = {
  getTestById,
  getTest,
  addTest,
  deleteTest,
  updateTest,
};
