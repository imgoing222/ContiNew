import { Button } from "@components/account/Button";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";
import { useRouter } from "next/router";
import React, { useState } from "react";
import profileApi from "src/api/profile";

interface Props {
	username: string;
}

function UserInfoEdit({ username }: Props) {
	const router = useRouter();
	const [newUsername, setNewUsername] = useState(username);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewUsername(e.target.value);
	};

	const handleEditClick = async () => {
		if (window.confirm("닉네임을 수정하시겠습니까?")) {
			await profileApi.changeUsername(newUsername);
			router.push("/profile");
		}
	};
	return (
		<>
			<Label>닉네임</Label>
			<div>
				<Input value={newUsername} onChange={handleInputChange} />
				<Button onClick={handleEditClick}>수정</Button>
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
