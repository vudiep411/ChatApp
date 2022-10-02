import { combineReducers } from "redux";
import conversations from "./conversations";
import user from "./user";

export default combineReducers({ user, conversations })