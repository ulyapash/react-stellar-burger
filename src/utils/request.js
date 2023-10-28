import { BASE_URL } from "./api";
import { checkResponse } from "./checkReponse";

export const request = (endpoint, options) => {
  return fetch(BASE_URL + endpoint, options).then(checkResponse);
};
