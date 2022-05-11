import { Button } from "@components/account/Button";
import { Container } from "@components/account/Container";
import { Header } from "@components/account/Header";
import { Input } from "@components/account/Input";
import { Label } from "@components/account/Label";

function ChangePassword() {
	return (
		<Container>
			<Header>비밀번호 변경</Header>
			<Label>새로운 비밀번호</Label>
			<Input />
			<Button>변경</Button>
		</Container>
	);
}

export default ChangePassword;
