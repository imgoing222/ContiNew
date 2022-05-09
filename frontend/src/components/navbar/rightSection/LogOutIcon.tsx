import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cookie from "react-cookies";
import authApi from "src/api/auth";
import styled from "styled-components";

function LogOutIcon() {
	const token = cookie.load("access_token");

	const handleLogoutClick = () => {
		authApi.logout();
	};

	return (
		token && (
			<>
				{/* <FontAwesome icon={faRightFromBracket} /> */}
				<button onClick={handleLogoutClick}>로그아웃</button>
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
