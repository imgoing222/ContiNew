import { faArrowRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

function UserIcon() {
	return (
		<>
			<FontAwesome icon={faUser} />
		</>
	);
}

const FontAwesome = styled(FontAwesomeIcon)`
	width: 2rem;
	height: 2rem;
	margin-right: 1.5rem;
`;

export default UserIcon;
