import styled from "styled-components";

function BottomSection() {
	return (
		<Container>
			<Textarea />
			<Form>
				<Button>보내기</Button>
			</Form>
		</Container>
	);
}

const Container = styled.div``;

const Textarea = styled.textarea``;

const Form = styled.form``;

const Button = styled.button``;

export default BottomSection;
