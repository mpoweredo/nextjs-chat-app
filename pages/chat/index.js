import { getSession, signOut } from 'next-auth/react';
import React from 'react';
import ActivityNavbar from '../../components/ActivityNavbar.js/ActivityNavbar';
import Chat from '../../components/chat/Chat';
import LoggedAs from '../../components/user/userInfo/LoggedAs';

const ChatPage = ({ session }) => {
	console.log(session.user.email);

	const logoutHandler = async () => {
		signOut();
		await fetch('/api/chat/ChangeOnlineStatus', {
			method: 'POST',
			body: JSON.stringify({ email: session.user.email, to: false }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	};

	return (
		<div className='h-screen w-full bg-zinc-900 '>
			<div>
				<ActivityNavbar />
			</div>
			<div className='lg:ml-[250px] flex items-center justify-center flex-col h-full'>
				<div>
					<LoggedAs name={session.user.name} />
				</div>
				<div>
					<Chat name={session.user.name} email={session.user.email} />
				</div>
				<button
					className=' px-5 py-2 rounded-sm font-semibold bg-slate-400 text-slate-900'
					onClick={logoutHandler}>
					logout
				</button>
			</div>
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
