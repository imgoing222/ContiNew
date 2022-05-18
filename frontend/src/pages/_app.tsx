import GlobalStyle from "@styles/globalstyle";
import styled, { ThemeProvider } from "styled-components";
import theme from "@styles/theme";
import Navbar from "@components/navbar/Navbar";
import type { AppProps } from "next/app";
import { persistedReducer, wrapper } from "src/store";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "../styles/global.css";
import "react-toastify/dist/ReactToastify.css";

const store = createStore(persistedReducer);
export const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Container>
					<GlobalStyle />
					<ThemeProvider theme={theme}>
						{Component.displayName !== "term" && <Navbar />}
						<Component {...pageProps} />
						<ToastContainer style={{ fontSize: "1.4rem" }} />
					</ThemeProvider>
				</Container>
			</PersistGate>
		</Provider>
	);
}
export default wrapper.withRedux(MyApp);

const Container = styled.div`
	padding: 1rem 1rem 0 1rem;
`;
