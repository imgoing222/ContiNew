import { useRouter } from "next/router";
import authApi from "src/api/auth";

function GoogleLogin() {
	const router = useRouter();
	const code = encodeURIComponent(router.query.code as string);
	// window.location.replace(`http://localhost:8080/api/members/login/google/callback?code=${code}`);
	// location.replace("/");
	return;
}

export default GoogleLogin;
