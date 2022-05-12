import { Button } from "@components/account/Button";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import UserInfoEdit from "@components/profile/UserInfoEdit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authApi from "src/api/auth";
import profileApi from "src/api/profile";
import { SET_USER } from "src/store/user";
import UserInfoType from "src/types/UserInfoType";
import { Container } from "./Container";

function UserInfo() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [userInfo, setUserInfo] = useState<UserInfoType>();

	const handleDeleteAccountClick = async () => {
		if (window.confirm("정말로 탈퇴하시겠습니까?")) {
			await authApi.deleteAccount();
			authApi.logout();
		}
	};

	useEffect(() => {
		profileApi.getUserInfo().then((res) => {
			setUserInfo(res.data);
			dispatch(SET_USER(res.data));
		});
	}, []);

	return (
		<Container>
			{userInfo && (
				<>
					{userInfo.phone_auth && <p>인증 된 회원입니다</p>}
					<Label>아이디</Label>
					<Input disabled value={userInfo.login_id} />
					<UserInfoEdit username={userInfo.username} />
					{!userInfo.phone_auth && (
						<Button
							onClick={() => {
								router.push("/account/smsVerification");
							}}
						>
							휴대폰 인증
						</Button>
					)}
					<button onClick={handleDeleteAccountClick}>회원탈퇴</button>
				</>
			)}
		</Container>
	);
}

export default UserInfo;
