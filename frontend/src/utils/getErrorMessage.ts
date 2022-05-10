interface errorMessage {
	[key: string]: string;
}

const errorMessage: errorMessage = {
	M01: "존재하지 않는 아이디 입니다.",
	M04: "비밀번호가 일치하지 않습니다.",
	M06: "이미 인증된 전화번호 입니다.",
	M08: "회원의 전화번호가 아닙니다.",
	I01: "해당 아이디로 인증 요청을 한 기록이 없습니다.",
	I02: "만료된 코드입니다.",
	I03: "일치하지 않는 인증 코드입니다.",
	P01: "휴대폰 인증은 하루에 3회만 가능합니다",
};

function getErrorMessage(code: any) {
	return errorMessage[code];
}

export default getErrorMessage;
