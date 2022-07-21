import '../styles/globals.css';
import '../styles/scrollbar.css';
import { SessionProvider } from 'next-auth/react';
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps, session }) {
	return (
		<SessionProvider session={session}>
			<SnackbarProvider maxSnack={3}>
				<Component {...pageProps} />
			</SnackbarProvider>
		</SessionProvider>
	);
}

export default MyApp;
