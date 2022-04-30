import styled from "styled-components";
import Layout from "./Layout";
import Title from "./Title";

function Description() {
	return (
		<Layout>
			<Title>상세 설명</Title>
			<Textarea name="description" />
		</Layout>
	);
}

export default Description;

const Textarea = styled.textarea`
	width: 100%;
	height: 20rem;
	font-size: 1.3rem;
	padding: 1rem;
	outline: none;
	border: none;
	border-top: 1px solid ${(props) => props.theme.borderColor};
	resize: none;
`;
