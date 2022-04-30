import styled from "styled-components";

const Button = styled.button`
	width: 10rem;
	height: 4.5rem;
	font-size: 1.4rem;
	margin-left: 2rem;
	background-color: #fff;
	border: 1px solid ${(props) => props.theme.borderColor};
	cursor: pointer;
`;

export default Button;
