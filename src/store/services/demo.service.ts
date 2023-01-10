import axios from "axios";
import { rootEndPoint } from "utils/endpoints";
const API_URL = `${rootEndPoint}/demo/`;

class DemoService {
  checkDemoAnswer(responseWord: string, demoId: string) {
    return axios
      .post(API_URL + "check-answer", {
        responseWord,
        demoId,
      })
      .then((response) => {
        return response.data;
      });
  }
  getDemoBoardInformation(demoId: string, demoLastTimeStamp: number) {
    return axios
      .post(API_URL + "board-info", { demoId, demoLastTimeStamp })
      .then((response) => {
        return response.data;
      });
  }
  revealDemoOneChar(responseWord: string, demoId: string) {
    return axios
      .get(API_URL + "reveal-one-char", { params: { responseWord, demoId } })
      .then((response) => {
        return response.data;
      });
  }
  removeDemoTwoKeys(responseWord: string, demoId: string) {
    return axios
      .get(API_URL + "remove-two-keys", { params: { responseWord, demoId } })
      .then((response) => {
        return response.data;
      });
  }
  getDemoSumTwoLetters(demoId: string) {
    return axios
      .get(API_URL + "get-two-sum", { params: { demoId } })
      .then((response) => {
        return response.data;
      });
  }
}
export default new DemoService();
