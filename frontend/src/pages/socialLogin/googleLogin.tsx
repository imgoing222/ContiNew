import { useRouter } from "next/router";
import authApi from "src/api/auth";

function GoogleLogin() {
	const router = useRouter();
	const code = router.query.code;
	authApi.googleLogin(code);
	return;
}

export default GoogleLogin;
