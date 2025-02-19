import axios from "axios";

const base = "api/auth";

export async function login(
  username: string,
  password: string,
  remember: boolean
) {
  return axios.post(base + "/login", {
    username,
    password,
    rememberMe: remember
  });
}

export async function signup(
  username: string,
  password: string,
  email: string
) {
  return axios.post(base + "/signup", { username, password, email });
}
