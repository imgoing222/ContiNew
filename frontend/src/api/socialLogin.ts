import { request } from "./request";

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_LOGIN_CLIENT_ID;
const KAKAO_URI = process.env.NEXT_PUBLIC_KAKAO_URL;

const socialLogin = {
	kakao: () =>
		(window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_URI}&response_type=code`),
	kakaoLogin: (code: string) =>
		request.get(`members/login/kakao/callback?code=${code}`).then((res) => console.log(res)),
};

export default socialLogin;
