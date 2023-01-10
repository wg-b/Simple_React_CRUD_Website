import { combineReducers } from "redux";
import auth from "./auth.reducer";
import play from "./play.reducer";
import demo from "./demo.reducer";

export default combineReducers({
  auth,
  play,
  demo,
});
