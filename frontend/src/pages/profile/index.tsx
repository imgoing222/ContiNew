import { Button } from "@components/account/Button";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import { Container } from "@components/profile/Container";
import UserInfoEdit from "@components/profile/UserInfoEdit";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

function Profile() {
	const { id, login_id, username, phone_nunber, phone_auth, provider } = useSelector(
		(state: RootState) => state.userInfo,
	);

	return (
		<Container>
			<p>인증 된 회원입니다</p>
			<Label>아이디</Label>
			<Input disabled value={login_id} />
			<UserInfoEdit username={username} />
			<Button>본인인증</Button>
		</Container>
	);
}

export default Profile;
