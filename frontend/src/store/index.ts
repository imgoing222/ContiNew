import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import mapInfo from "./mapInfo";

const rootReducer = combineReducers({
	mapInfo,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["mapInfo"],
};

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
