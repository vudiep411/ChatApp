import { combineReducers } from "redux";
import chatrooms from "./chatrooms";
import user from "./user";

export default combineReducers({ user, chatrooms })