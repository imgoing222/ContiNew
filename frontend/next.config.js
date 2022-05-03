/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: "/login/oauth2/code/:google*",
				destination: "/socialLogin/googleLogin",
			},
		];
	},
};

module.exports = nextConfig;
