import { BASE_URL } from "./api";
import { checkResponse } from "./checkReponse";
import { getCookie, setCookie } from "./cookies";
import { getAccessToken } from "./getAccessToken";

export const request = (endpoint: string, options?: RequestInit) => {
  return fetch(BASE_URL + endpoint, options).then(checkResponse);
};

export const requestWithToken = (endpoint: string, options: RequestInit) => {
  return request(endpoint, options).catch((error) => {
    return new Promise((resolve, reject) => {
      if (error === "Ошибка 403") {
        getAccessToken(localStorage.getItem("refreshToken") || "")
          .then((tokenData) => {
            if (!tokenData.success) {
              return reject(tokenData);
            }

            localStorage.setItem("refreshToken", tokenData.refreshToken);
            setCookie("accessToken", tokenData.accessToken.substring(7));

            requestWithToken(endpoint, {
              ...options,
              headers: {
                ...options.headers,
                Authorization: "Bearer " + getCookie("accessToken"),
              },
            })
              .then((result) => {
                resolve(result);
              })
              .catch((error) => reject(error));
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject(error);
      }
    });
  });
};
