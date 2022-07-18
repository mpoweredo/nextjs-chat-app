import { getSession, signOut } from 'next-auth/react';
import React from 'react';

const ChatPage = ({ session }) => {
	return (
		<div className='h-screen w-full bg-teal-900'>
			<h1>ChatPage</h1>
            <h1>{session.user.email}</h1>
			<button onClick={() => signOut()}>logout</button>
		</div>
	);
};

export default ChatPage;

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });

	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
}
