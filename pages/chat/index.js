import { getSession, signOut } from 'next-auth/react';
import React from 'react';
import Chat from '../../components/chat/Chat';
import LoggedAs from '../../components/user/userInfo/LoggedAs';

const ChatPage = ({ session }) => {
	return (
		<div className='h-screen w-full bg-zinc-900 flex items-center justify-center flex-col'>
			<div>
				<LoggedAs name={session.user.name} />
			</div>
			<div>
				<Chat name={session.user.name} email={session.user.email} />
			</div>
			<button className=' px-5 py-2 rounded-sm font-semibold bg-slate-400 text-slate-900' onClick={() => signOut()}>logout</button>
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
