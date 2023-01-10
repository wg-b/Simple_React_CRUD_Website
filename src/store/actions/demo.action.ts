import { Dispatch } from "react";
import { toast } from "react-toastify";
import demoService from "store/services/demo.service";

import {
  GET_BOARD_INFO,
  GET_REVEAL_WORD,
  GET_REMOVE_TWO_KEYS,
  GET_SUM_TWO_LETTERS,
  CHECK_ANSWER,
  HINT_LOADING,
  CHANGE_DEMO_TIMESTAMP,
  CHANGE_DEMO_DAILYCOUNT,
} from "./action-types";

export const checkDemoAnswer =
  (responseWord: string, demoId: string) => (dispatch: Dispatch<any>) => {
    return demoService.checkDemoAnswer(responseWord, demoId).then(
      (data) => {
        dispatch({
          type: CHECK_ANSWER,
          payload: data.info,
        });

        if (!data.success) {
          toast.warning("Wrong!", {
            theme: "colored",
          });
          return Promise.resolve();
        }
        // toast.success("Check Answer!", {
        //   theme: "colored",
        // });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(message, {
          theme: "colored",
        });
        return Promise.reject();
      }
    );
  };

export const getDemoBoardInfomation =
  (demoId: string, demoLastTimeStamp: number) => (dispatch: Dispatch<any>) => {
    return demoService.getDemoBoardInformation(demoId, demoLastTimeStamp).then(
      (data) => {
        dispatch({
          type: GET_BOARD_INFO,
          payload: data,
        });
        // toast.success("Get Board Information Success", {
        //   theme: "colored",
        // });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(message, {
          theme: "colored",
        });
        return Promise.reject();
      }
    );
  };

export const revealDemoOneChar =
  (responseWord: string, demoId: string) => (dispatch: Dispatch<any>) => {
    dispatch({
      type: HINT_LOADING,
      payload: true,
    });
    return demoService.revealDemoOneChar(responseWord, demoId).then(
      (data) => {
        dispatch({
          type: GET_REVEAL_WORD,
          payload: data,
        });
        dispatch({
          type: HINT_LOADING,
          payload: false,
        });

        // toast.success("Get Reveal Word Success", {
        //   theme: "colored",
        // });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: HINT_LOADING,
          payload: false,
        });
        toast.error(message, {
          theme: "colored",
        });
        return Promise.reject();
      }
    );
  };

export const removeDemoTwoKeys =
  (responseWord: string, demoId: string) => (dispatch: Dispatch<any>) => {
    dispatch({
      type: HINT_LOADING,
      payload: true,
    });
    return demoService.removeDemoTwoKeys(responseWord, demoId).then(
      (data) => {
        dispatch({
          type: GET_REMOVE_TWO_KEYS,
          payload: data,
        });
        dispatch({
          type: HINT_LOADING,
          payload: false,
        });
        // toast.success("Remove Two Keys From Keyboard!", {
        //   theme: "colored",
        // });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: HINT_LOADING,
          payload: false,
        });
        toast.error(message, {
          theme: "colored",
        });
        return Promise.reject();
      }
    );
  };

export const getDemoSumTwoLetters =
  (demoId: string) => (dispatch: Dispatch<any>) => {
    dispatch({
      type: HINT_LOADING,
      payload: true,
    });
    return demoService.getDemoSumTwoLetters(demoId).then(
      (data) => {
        dispatch({
          type: GET_SUM_TWO_LETTERS,
          payload: data,
        });

        dispatch({
          type: HINT_LOADING,
          payload: false,
        });
        // toast.success("Get Sum Two Letters!", {
        //   theme: "colored",
        // });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: HINT_LOADING,
          payload: false,
        });
        toast.error(message, {
          theme: "colored",
        });
        return Promise.reject();
      }
    );
  };

export const changeDemoTimestamp = (stamp: number) => {
  return {
    type: CHANGE_DEMO_TIMESTAMP,
    payload: stamp,
  };
};

export const changeDemoDailyCount = (count: number) => {
  return {
    type: CHANGE_DEMO_DAILYCOUNT,
    payload: count,
  };
};
