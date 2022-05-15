const STORE = "chat/setArticleInfo";

interface ActionType {
	type: string;
	data: DataType
}

interface DataType {
	sale: number;
	seller: string;
	sellerId: string;
	buyer: string;
	buyerId: string;
}

export const SET_ARTICLEINFO = (data: DataType) => ({ type: STORE, data });

const initialState = {
	article_id: 0,
	seller_name: "",
	seller_Id: "",
	buyer_name: "",
	buyer_Id: "",
};

function ArticleInfo(state = initialState, action: ActionType) {
	switch (action.type) {
		case STORE:
			return {
				...state,
				article_id: action.data.sale,
				seller_name: action.data.seller,
				seller_id: action.data.sellerId,
				buyer_name: action.data.buyer,
				buyer_id: action.data.buyerId,
			};
		default:
			return state;
	}
}

export default ArticleInfo;
