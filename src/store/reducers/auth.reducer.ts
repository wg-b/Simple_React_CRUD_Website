import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGN_OUT,
  CHANGE_LAST_TIMESTAMP,
  CHANGE_GAME_TYPE,
} from "../actions/action-types";

const initialState = { isLoggedIn: false, user: {}, accessToken: null };

export default function AuthReducer(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        accessToken: payload.accessToken,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        accessToken: null,
      };
    case SIGN_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {},
        accessToken: null,
      };
    case CHANGE_LAST_TIMESTAMP:
      return {
        ...state,
        user: {
          ...state.user,
          lastTimestamp: payload,
        },
      };
    case CHANGE_GAME_TYPE:
      return {
        ...state,
        user: {
          ...state.user,
          gameType: payload,
        },
      };
    default:
      return state;
  }
}
