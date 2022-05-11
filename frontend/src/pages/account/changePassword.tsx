import { Button } from "@components/account/Button";
import { Container } from "@components/account/Container";
import { Header } from "@components/account/Header";
import { Input } from "@components/account/Input";
import { useRouter } from "next/router";
import React, { useState } from "react";
import authApi from "src/api/auth";

function ChangePassword() {
	const router = useRouter();
	const changeToken = router.query.name as string;
	const [value, setValue] = useState({ new_password: "", change_token: changeToken });

	const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, new_password: e.target.value });
	};

	const handleChangeClick = async () => {
		await authApi.changePassword(value);
		alert("비밀번호가 변경되었습니다.");
		router.push("account/signin");
	};

	return (
		<Container>
			<Header>비밀번호 변경</Header>
			<p>새로운 비밀번호를 입력하세요</p>
			<Input onChange={handleNewPasswordChange} />
			<Button onClick={handleChangeClick}>변경</Button>
		</Container>
	);
}

export default ChangePassword;
