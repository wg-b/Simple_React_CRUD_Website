import { LetterListTypes } from "components/types";
import { DAILY_MODE } from "config";
import { Dispatch } from "react";
import { toast } from "react-toastify";
import playService from "store/services/play.service";

import {
  CHANGE_RESP_WORD,
  GET_BOARD_INFO,
  GET_REVEAL_WORD,
  GET_REMOVE_TWO_KEYS,
  GET_SUM_TWO_LETTERS,
  CHANE_SELECTED_KEY,
  CHECK_ANSWER,
  CHANGE_LAST_TIMESTAMP,
  CHANGE_GAME_TYPE,
  HINT_LOADING,
  SET_CURSOR_INDEX,
} from "./action-types";

export const checkAnswer =
  (responseWord: string, gameType: string) => (dispatch: Dispatch<any>) => {
    return playService.checkAnswer(responseWord).then(
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
        if (gameType === DAILY_MODE) {
          dispatch({
            type: CHANGE_LAST_TIMESTAMP,
            payload: new Date().getTime(),
          });
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

export const getBoardInformation =
  (gameType: string) => (dispatch: Dispatch<any>) => {
    return playService.getBoardInformation(gameType).then(
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

export const revealOneChar =
  (responseWord: string) => (dispatch: Dispatch<any>) => {
    dispatch({
      type: HINT_LOADING,
      payload: true,
    });
    return playService.revealOneChar(responseWord).then(
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

export const removeTwoKeys =
  (responseWord: string) => (dispatch: Dispatch<any>) => {
    dispatch({
      type: HINT_LOADING,
      payload: true,
    });
    return playService.removeTwoKeys(responseWord).then(
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

export const getSumTwoLetters = () => (dispatch: Dispatch<any>) => {
  dispatch({
    type: HINT_LOADING,
    payload: true,
  });
  return playService.getSumTwoLetters().then(
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

export const changeResponseWord = (newWord: string) => {
  return {
    type: CHANGE_RESP_WORD,
    payload: newWord,
  };
};

// export const changeSelectedKey = (newKey: LetterListTypes) => {
//   return {
//     type: CHANE_SELECTED_KEY,
//     payload: newKey,
//   };
// };

export const setCursorIndex = (cursorIndex: Number) => {
  return {
    type: SET_CURSOR_INDEX,
    payload: cursorIndex,
  };
};

export const changeGameType =
  (gameType: string) => (dispatch: Dispatch<any>) => {
    return playService.changeGameType(gameType).then(
      () => {
        dispatch({
          type: CHANGE_GAME_TYPE,
          payload: gameType,
        });
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
