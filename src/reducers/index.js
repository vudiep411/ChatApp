import { combineReducers } from "redux";
import user from "./user";
import rooms from "./rooms";
import conversations from "./conversations";

export default combineReducers({ user, rooms, conversations })