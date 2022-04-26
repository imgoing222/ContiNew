import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";

function ChatIcon() {
	const router = useRouter();

	return (
		<>
			<FontAwesome icon={faRocketchat} onClick={() => router.push("/chat")} />
		</>
	);
}

const FontAwesome = styled(FontAwesomeIcon)`
	width: 2rem;
	height: 2rem;
	margin-right: 1.5rem;
	cursor: pointer;
`;

export default ChatIcon;
