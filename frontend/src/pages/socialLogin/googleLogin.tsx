import { useRouter } from "next/router";
import authApi from "src/api/auth";
import cookie from "react-cookies";
import { useEffect } from "react";

function KakaoLogin() {
	// const router = useRouter();
	// useEffect(() => {
	// 	const code = encodeURIComponent(router.query.code as string);
	// 	console.log(code);
	// 	if (code !== "undefined") {
	// 		authApi.kakaoLogin(code).then(() => {
	// 			console.log("success");
	// 			if (cookie.load("access_token")) location.replace("/");
	// 		});
	// 	}
	// });
	// return;
}

export default KakaoLogin;
