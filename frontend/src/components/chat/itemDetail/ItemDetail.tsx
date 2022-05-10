import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "src/store";

function ItemDetail() {
  const { article_id } = useSelector((state: RootState) => state.articleId);

	return (
		<Container>
			<Title>
				<h3>Detail</h3>
			</Title>
      <div>
        <img src="" alt="Img" />
      </div>
      <div>
        <h3>가격정보.</h3>
        <p>월세: 2000/30</p>
        <p>관리비: 매월 5만 원</p>
        <h3>위치</h3>
        <p>서울특별시 동작구 사당동</p>
      </div>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
  flex: 3;
	flex-direction: column;
	align-items: center;
	height: 100%;
	border-left: solid 2px #d3d3d3;
`;

const Title = styled.div`
  width: 100%;
  height: 5rem;
  text-align: center;
  border-bottom: solid 2px #d3d3d3;
`;

export default ItemDetail;
