import axios from "axios";
import authHeader from "./auth-header";
import { rootEndPoint } from "utils/endpoints";
const API_URL = `${rootEndPoint}/user/`;
class UserService {
  getAllUsers(gameType: string, email: string | undefined) {
    return axios.get(API_URL, {
      headers: authHeader(),
      params: {
        gameType,
        email,
      },
    });
  }
}
export default new UserService();
