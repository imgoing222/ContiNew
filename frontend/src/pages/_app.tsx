import GlobalStyle from "@styles/globalstyle";
import styled, { ThemeProvider } from "styled-components";
import theme from "@styles/theme";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Container>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</Container>
	);
}
export default MyApp;

const Container = styled.div`
	padding: 1rem 0 0 1rem;
`;
