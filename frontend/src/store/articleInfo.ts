const STORE = "chat/setArticleInfo";

interface ActionType {
	type: string;
	data: DataType
}

interface DataType {
	sale: number;
	seller: string;
	buyer: string;
}

export const SET_ARTICLEINFO = (data: DataType) => ({ type: STORE, data });

const initialState = {
	article_id: 0,
	seller_name: "",
	buyer_name: "",
};

function ArticleInfo(state = initialState, action: ActionType) {
	switch (action.type) {
		case STORE:
			return {
				...state,
				article_id: action.data.sale,
				seller_name: action.data.seller,
				buyer_name: action.data.buyer,
			};
		default:
			return state;
	}
}

export default ArticleInfo;
