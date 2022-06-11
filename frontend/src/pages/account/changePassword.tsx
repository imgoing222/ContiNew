import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Input, Header, Container } from "@components/account/Index";
import { Text } from "@components/createSale/Table";
import authApi from "src/api/auth";

function ChangePassword() {
	const router = useRouter();
	const changeToken = router.query.name as string;
	const [newPassword, setNewPassword] = useState("");

	const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPassword(e.target.value);
	};

	const handleChangeClick = async () => {
		await authApi.changePassword({ new_password: newPassword, change_token: changeToken });
		alert("비밀번호가 변경되었습니다.");
		router.push("/account/signin");
	};

	return (
		<Container>
			<Header>비밀번호 변경</Header>
			<Text>새로운 비밀번호를 입력하세요</Text>
			<Input onChange={handleNewPasswordChange} />
			<Button onClick={handleChangeClick} backgroundColor="#dc143c" color="white" margin="2rem 0">
				변경
			</Button>
		</Container>
	);
}

export default ChangePassword;
