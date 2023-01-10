import {
  CHECK_ANSWER,
  GET_BOARD_INFO,
  CHANGE_RESP_WORD,
  GET_REVEAL_WORD,
  GET_REMOVE_TWO_KEYS,
  GET_SUM_TWO_LETTERS,
  // CHANE_SELECTED_KEY,
  REMOVE_BOARD_INFO,
  HINT_LOADING,
  SET_CURSOR_INDEX,
} from "store/actions/action-types";

const initialState = {
  score: 0,
  round: 0,
  demoId: "",
  demoRound: 0,
  sampleWord: "",
  targetWord: "",
  letterList: [],
  responseWord: "",
  revealWord: "",
  sumTargetWord: 0,
  alphabetRemoved: "",
  subIndexPair: [],
  subSumValue: 0,
  hintLoading: false,
  cursorIndex: 0,
};

export default function PlayReducer(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case CHECK_ANSWER:
      return {
        ...state,
        ...payload,
      };

    case GET_BOARD_INFO:
      return {
        ...state,
        ...payload,
      };
    case CHANGE_RESP_WORD:
      return {
        ...state,
        responseWord: payload,
      };
    // case CHANE_SELECTED_KEY:
    //   return {
    //     ...state,
    //     selectedKey: payload,
    //   };
    case GET_REVEAL_WORD:
      return {
        ...state,
        ...payload,
      };
    case GET_REMOVE_TWO_KEYS:
      return {
        ...state,
        ...payload,
      };

    case GET_SUM_TWO_LETTERS:
      return {
        ...state,
        ...payload,
      };
    case REMOVE_BOARD_INFO:
      return {
        ...state,
        score: 0,
        round: 0,
        sampleWord: "",
        targetWord: "",
        letterList: [],
        responseWord: "",
        revealWord: "",
        sumTargetWord: 0,
        alphabetRemoved: "",
        subIndexPair: [],
        subSumValue: 0,
      };
    case HINT_LOADING:
      return {
        ...state,
        hintLoading: payload,
      };
    case SET_CURSOR_INDEX:
      return {
        ...state,
        cursorIndex: payload,
      };
    default:
      return state;
  }
}
