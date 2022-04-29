import { Button } from "@components/account/Button";
import { Header } from "@components/account/Header";
import { LinkButton } from "@components/account/LinkButton";
import { useRouter } from "next/router";

function signupComplete() {
	const router = useRouter();

	const handleHomeClick = () => {
		router.push("/");
	};
	return (
		<>
			<Header>가입완료</Header>
			<p>username님 환영합니다</p>
			<Button onClick={handleHomeClick}>홈</Button>
		</>
	);
}

export default signupComplete;
