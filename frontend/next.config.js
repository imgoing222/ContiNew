/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
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
