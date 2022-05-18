import { Button } from "@components/account/Button";
import { Header } from "@components/account/Header";
import { LinkButton } from "@components/account/LinkButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";

function signupComplete() {
	const router = useRouter();

	const username = useSelector((state: RootState) => state.userInfo.username);

	const handleHomeClick = () => {
		router.push("/");
	};
	return (
		<>
			<Header>휴대폰 인증 완료</Header>
			<p>{username}님 환영합니다</p>
			<Button onClick={handleHomeClick}>홈</Button>
		</>
	);
}

export default signupComplete;
