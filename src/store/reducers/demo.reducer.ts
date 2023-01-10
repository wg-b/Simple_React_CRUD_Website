import {
  CHANGE_DEMO_TIMESTAMP,
  CHANGE_DEMO_DAILYCOUNT,
} from "store/actions/action-types";

const initialState = {
  demoTimeStamp: 0,
  dailyCount: 0,
};

export default function DemoReducer(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_DEMO_TIMESTAMP:
      return {
        ...state,
        demoTimeStamp: payload,
      };
    case CHANGE_DEMO_DAILYCOUNT:
      return {
        ...state,
        dailyCount: payload,
      };
    default:
      return state;
  }
}
