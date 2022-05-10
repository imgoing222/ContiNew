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
  if (action.type === STORE) {
    return {
      ...state,
      article_id: action.id
    }
  }
}

export default articleId;
