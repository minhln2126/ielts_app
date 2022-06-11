import { constants } from "../constants";
function login(email, password) {
  console.log("user service");
  let requestOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };
  return fetch(`${constants.apiUrl}/users/login`, requestOption)
    .then((res) => res.json())
    .then((json) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      if (json.user) {
        localStorage.setItem("user", JSON.stringify(json.user));
        localStorage.setItem(
          "token",
          JSON.stringify("Bearer ".concat(json.token))
        );
        console.log(json.user);
      }
      return json;
    });
}
function register(name, email, password) {
  console.log("user service");
  let requestOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  };
  return fetch(`${constants.apiUrl}/users/signup`, requestOption)
    .then((res) => res.json())
    .then((json) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      if (json.user) {
        localStorage.setItem("user", JSON.stringify(json.user));
        localStorage.setItem(
          "token",
          JSON.stringify("Bearer ".concat(json.token))
        );
        console.log(json.user);
      }
      return json;
    });
}
function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}
function update(id, info) {
  let requestOption = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: JSON.parse(localStorage.getItem("token")),
    },
    body: JSON.stringify(info),
  };
  return fetch(`${constants.apiUrl}/users/${id}`, requestOption)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    });
}
function addOne(user) {
  let requestOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: JSON.parse(localStorage.getItem("token")),
    },
    body: JSON.stringify(user),
  };
  return fetch(`${constants.apiUrl}/users`, requestOption)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
}
export const userService = {
  login,
  logout,
  register,
  update,
  addOne,
};
