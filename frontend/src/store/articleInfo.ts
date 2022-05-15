const STORE = "chat/setArticleInfo";

interface ActionType {
	type: string;
	data: DataType
}

interface DataType {
	sale: number;
	seller: string;
	seller_id: string;
	buyer: string;
	buyer_id: string;
}

export const SET_ARTICLEINFO = (data: DataType) => ({ type: STORE, data });

const initialState = {
	articleId: 0,
	sellerName: "",
	sellerId: "",
	buyerName: "",
	buyerId: "",
};

function ArticleInfo(state = initialState, action: ActionType) {
	switch (action.type) {
		case STORE:
			return {
				...state,
				articleId: action.data.sale,
				sellerName: action.data.seller,
				sellerId: action.data.seller_id,
				buyerName: action.data.buyer,
				buyerId: action.data.buyer_id,
			};
		default:
			return state;
	}
}

export default ArticleInfo;
