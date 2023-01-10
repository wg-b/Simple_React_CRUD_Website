import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGN_OUT,
  SET_MESSAGE,
  REMOVE_BOARD_INFO,
} from "./action-types";
import { Dispatch } from "react";
import { toast } from "react-toastify";

import AuthService from "../services/auth.service";

export const register =
  (username: string, email: string, password: string) =>
    (dispatch: Dispatch<any>) => {
      return AuthService.register(username, email, password).then(
        (response) => {
          dispatch({
            type: REGISTER_SUCCESS,
          });
          dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
          });
          // toast.success("Register Success", {
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
            type: REGISTER_FAIL,
          });
          toast.error(message, {
            theme: "colored",
          });
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          return Promise.reject();
        }
      );
    };
export const login =
  (email: string, password: string) => (dispatch: Dispatch<any>) => {
    return AuthService.login(email, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data.user, accessToken: data.accessToken },
        });

        // toast.success("Login Success", {
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
          type: LOGIN_FAIL,
        });
        toast.error(message, {
          theme: "colored",
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };

export const signOut = () => (dispatch: any) => {
  AuthService.signOut();
  dispatch({
    type: SIGN_OUT,
  });
  dispatch({
    type: REMOVE_BOARD_INFO,
  });
  // toast.success("Sign out", {
  //   theme: "colored",
  // });
  return Promise.resolve();
};

export const forgot = (email: string) => (dispatch: Dispatch<any>) => {
  return AuthService.forgot(email).then(
    (data) => {
      // toast.success("Otp has been sent to your mail it exist", {
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

export const sendEmail = (formData: any) => (dispatch: Dispatch<any>) => {
  return AuthService.sendEmail(formData).then(
    (data) => {
      toast.success("Your email has been sent to Countect Support!", {
        theme: "colored",
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

export const resetPassword =
  (otp: string, password: string) => (dispatch: Dispatch<any>) => {
    return AuthService.resetPassword(otp, password).then(
      (data) => {
        // toast.success("Reset Password Success", {
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
