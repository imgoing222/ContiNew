/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	async rewrites() {
		return [
			{
				source: "/login/oauth2/code/:kakao*",
				destination: "/socialLogin/kakaoLogin",
			},
		];
	},
};

module.exports = nextConfig;
