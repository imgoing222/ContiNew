interface RecommendDataProps {
	recommendData: { id: number; imageUrl: string }[];
}

function RecommendSection({ recommendData }: RecommendDataProps) {
	return <div>추천 매물</div>;
}

export default RecommendSection;
