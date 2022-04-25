import GlobalStyle from "@styles/globalstyle";
import { ThemeProvider } from "styled-components";
import theme from "@styles/theme";
import type { AppProps } from "next/app";
declare global {
	interface Window {
		kakao: any;
	}
}
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}
export default MyApp;
