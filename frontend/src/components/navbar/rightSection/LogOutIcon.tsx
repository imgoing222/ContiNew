import { faArrowRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cookie from "react-cookies";
import styled from "styled-components";

function LogOutIcon() {
	const token = cookie.load("access_token");

	return (
		token && (
			<>
				<FontAwesome icon={faArrowRightFromBracket} />
			</>
		)
	);
}

const FontAwesome = styled(FontAwesomeIcon)`
	width: 2rem;
	height: 2rem;
	margin-right: 1.5rem;
	cursor: pointer;
`;

export default LogOutIcon;
