import { useRouter } from "next/router";
import cookie from "react-cookies";
import { useEffect } from "react";
import socialLogin from "src/api/socialLogin";

function KakaoLogin() {
	const router = useRouter();
	const code = encodeURIComponent(router.query.code as string);
	useEffect(() => {
		console.log(code);
		if (code !== "undefined") {
			socialLogin.kakaoLogin(code).then(() => {
				console.log("success");
				if (cookie.load("access_token")) location.replace("/");
			});
		}
	});
	return;
}

export default KakaoLogin;
