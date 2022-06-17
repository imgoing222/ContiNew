import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

import { Button, Header } from "@components/account/Index";

function SignupComplete() {
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

export default SignupComplete;
