import {combineReducers} from "redux";
import {NavReducer} from "./navReducer";
import {UserReducer} from "./userReducer";
import {HistoryReducer} from "./historyReducer";
import {CartReducer} from "./cartReducer";
export default combineReducers({
    user : UserReducer,
    nav : NavReducer,
    history : HistoryReducer,
    cart : CartReducer,
})