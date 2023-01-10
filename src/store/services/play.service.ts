import axios from "axios";
import authHeader from "./auth-header";
import { rootEndPoint } from "utils/endpoints";
const API_URL = `${rootEndPoint}/play/`;

class PlayService {
  checkAnswer(responseWord: string) {
    return axios
      .post(
        API_URL + "check-answer",
        {
          responseWord: responseWord,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  getBoardInformation(gameType: string) {
    return axios
      .post(API_URL + "board-info", { gameType }, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  revealOneChar(responseWord: string) {
    return axios
      .get(API_URL + "reveal-one-char", {
        headers: authHeader(),
        params: { responseWord },
      })
      .then((response) => {
        return response.data;
      });
  }
  removeTwoKeys(responseWord: string) {
    return axios
      .get(API_URL + "remove-two-keys", {
        headers: authHeader(),
        params: { responseWord },
      })
      .then((response) => {
        return response.data;
      });
  }

  getSumTwoLetters() {
    return axios
      .get(API_URL + "get-two-sum", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  changeGameType(gameType: string) {
    return axios.post(
      API_URL + "game-type",
      { gameType },
      { headers: authHeader() }
    );
  }

  getTimestamp() {
    return axios
      .get(API_URL + "get-timestamp", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}
export default new PlayService();
