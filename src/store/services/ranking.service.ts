import axios from "axios";
import authHeader from "./auth-header";
import { rootEndPoint } from "utils/endpoints";
const API_URL = `${rootEndPoint}/ranking/`;
class RankingService {
  getRanking() {
    return axios.get(API_URL, { headers: authHeader() });
  }
}
export default new RankingService();
