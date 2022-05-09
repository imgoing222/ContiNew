import { Button } from "@components/account/Button";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import { Container } from "@components/profile/Container";
import UserInfoEdit from "@components/profile/UserInfoEdit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import profileApi from "src/api/profile";
import { SET_USER } from "src/store/user";
import UserInfo from "src/types/UserInfo";

function Profile() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [userInfo, setUserInfo] = useState<UserInfo>();

	useEffect(() => {
		profileApi.getUserInfo().then((res) => {
			setUserInfo(res.data);
			dispatch(SET_USER(res.data));
		});
	}, []);

	return (
		userInfo && (
			<Container>
				{userInfo.phone_auth && <p>인증 된 회원입니다</p>}
				<Label>아이디</Label>
				<Input disabled value={userInfo.login_id} />
				<UserInfoEdit username={userInfo.username} />
				{!userInfo.phone_auth && (
					<Button
						onClick={() => {
							router.push("/smsVerification");
						}}
					>
						휴대폰 인증
					</Button>
				)}
			</Container>
		)
	);
}

export default Profile;
