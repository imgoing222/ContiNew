import { useRouter } from "next/router";

function GoogleLogin() {
	const router = useRouter();
	const code = router.query.code;

	return;
}

export default GoogleLogin;
