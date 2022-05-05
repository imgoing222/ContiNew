import { Button } from "@components/account/Button";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";

function UserInfoEdit() {
	return (
		<>
			<Label>닉네임</Label>
			<div>
				<Input />
				<Button>수정</Button>
			</div>
			<Label>비밀번호</Label>
			<Input placeholder="기존 비밀번호" />
			<Input placeholder="새로운 비밀번호" />
			<Input placeholder="새로운 비밀번호 확인" />
			<Button>수정</Button>
		</>
	);
}

export default UserInfoEdit;
