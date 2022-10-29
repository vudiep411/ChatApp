import { combineReducers } from "redux";
import user from "./user";
import rooms from "./rooms";
import selectedConvo from "./selectedConvo";

export default combineReducers({ user, rooms, selectedConvo })