const STORE = "chat/setArticleId";

interface ActionType {
	type: string;
	id: number;
}

export const SET_ARTICLEID = (id: number) => ({ type: STORE, id });

const initialState = {
	article_id: 0,
};

function articleId(state = initialState, action: ActionType) {
	switch (action.type) {
		case STORE:
			return {
				...state,
				article_id: action.id,
			};
    default:
      return state;
	}
}

export default articleId;
