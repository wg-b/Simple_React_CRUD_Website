import axios from "axios";
import { rootEndPoint } from "utils/endpoints";
const API_URL = `${rootEndPoint}/auth/`;
class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  signOut() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "/signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  forgot(email: string) {
    return axios.post(API_URL + "reset", { email });
  }

  resetPassword(otp: string, password: string) {
    return axios.put(API_URL + "reset", {
      otp,
      password,
    });
  }

  sendEmail(formdata: any) {
    return axios.post(API_URL + "contact-us", {
      formdata
    });
  }


}
export default new AuthService();
