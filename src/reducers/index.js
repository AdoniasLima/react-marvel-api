import { combineReducers } from "redux";
import FavoritesReducer from "./FavoritesReducer";

export default combineReducers({
    favorites: FavoritesReducer
});