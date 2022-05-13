import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import userInfo from "./user";
import articleId from "./articleId";
import searchFilter from "./searchFilter";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

export const rootReducer = combineReducers({
	userInfo,
	articleId,
	searchFilter,
});

const reducer = (state: any, action: any) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state,
			...action.payload,
		};
		return nextState;
	}
	return rootReducer(state, action);
};

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["userInfo", "articleId"],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

// const bindMiddleware = (middleware: any) => {
// 	if (process.env.NODE_ENV !== "production") {
// 		const { composeWithDevTools } = require("redux-devtools-extension");
// 		return composeWithDevTools(applyMiddleware(...middleware));
// 	}
// 	return applyMiddleware(...middleware);
// };

const initStore = () => {
	return createStore(reducer);
	// return createStore(reducer, bindMiddleware([]));
};

export const wrapper = createWrapper(initStore);
