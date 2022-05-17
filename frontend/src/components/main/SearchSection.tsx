import styled from "styled-components";

export interface MapRefType {
	kakaoMap: React.MutableRefObject<kakao.maps.Map>;
}

function SearchSection() {
	return <Section></Section>;
}

const Section = styled.section`
	height: 60rem;
	background: url("/background.png");
	background-size: 100% 100%;
	background-repeat: no-repeat;
	opacity: 0.8;
`;

export default SearchSection;
