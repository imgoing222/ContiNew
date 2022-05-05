import { Button } from "@components/account/Button";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";

function Profile() {
	return (
		<>
			<p>인증 된 회원입니다</p>
			<Label>아이디</Label>
			<Input disabled />
			<div>회원정보 수정</div>
			<Button>본인인증</Button>
		</>
	);
}

export default Profile;
