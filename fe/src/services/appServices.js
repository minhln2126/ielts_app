import { constants as c } from "../constants";

function getHomeInfo() {
  let requestOption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(`${c.apiUrl}/home`, requestOption)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    });
}

function getAdminInfo() {
  let requestOption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(`${c.apiUrl}/admin`, requestOption)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    });
}

export const appServices = {
  getHomeInfo,
  getAdminInfo,
};
