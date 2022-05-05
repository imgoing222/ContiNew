import { Button } from "@components/account/Button";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import { Container } from "@components/profile/Container";
import UserInfoEdit from "@components/profile/UserInfoEdit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profileApi from "src/api/profile";
import { RootState } from "src/store";
import { SET_USER } from "src/store/user";
import UserInfo from "src/types/UserInfo";

function Profile() {
	const dispatch = useDispatch();
	const [userInfo, setUserInfo] = useState<UserInfo>();

	useEffect(() => {
		profileApi.getUserInfo().then((res) => {
			console.log(res);
			setUserInfo(res.data);
			dispatch(SET_USER(res.data));
		});
	}, []);

	return (
		userInfo && (
			<Container>
				<p>인증 된 회원입니다</p>
				<Label>아이디</Label>
				<Input disabled value={userInfo.login_id} />
				<UserInfoEdit username={userInfo.username} />
				<Button>본인인증</Button>
			</Container>
		)
	);
}

export default Profile;
