import { faArrowRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cookie from "react-cookies";
import styled from "styled-components";

function UserIcon() {
	const token = cookie.load("access_token");

	return token ? (
		<>
			<FontAwesome icon={faUser} />
			<FontAwesome icon={faArrowRightFromBracket} />
		</>
	) : (
		<FontAwesome icon={faUser} />
	);
}

const FontAwesome = styled(FontAwesomeIcon)`
	width: 2rem;
	height: 2rem;
	margin-right: 1.5rem;
`;

export default UserIcon;
