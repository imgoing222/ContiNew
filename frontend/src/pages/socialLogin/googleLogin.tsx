import { useRouter } from "next/router";

function GoogleLogin() {
	const router = useRouter();
	console.log(router);

	return <p>구글로그인</p>;
}

export default GoogleLogin;
