import { request } from "./request";

export const getAccessToken = (refreshToken: string) => {
  return request("/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  });
};
