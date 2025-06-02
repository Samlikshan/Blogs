import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const registerService = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/register`,
      {
        username,
        email,
        password,
      },
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    return error.response;
  }
};

export const loginService = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const logoutService = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/logout`,
      {},
      { withCredentials: true, withXSRFToken: true }
    );
    console.log(response, "logout response");
    return response;
  } catch (error) {
    return error.response;
  }
};
