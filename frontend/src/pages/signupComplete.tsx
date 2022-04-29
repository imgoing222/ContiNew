import { Header } from "@components/account/Header";
import { LinkButton } from "@components/account/LinkButton";

function signupComplete() {
	return (
		<>
			<Header>가입완료</Header>
			<p>username님 환영합니다</p>
			<LinkButton href="/">홈</LinkButton>
		</>
	);
}

export default signupComplete;
