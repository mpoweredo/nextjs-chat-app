import Message from './Message';
import MessageForm from './MessageForm';
import { CircularProgress } from '@mui/material';
import useRealtimeFetch from '../../hooks/fetchRealtime';
import { useEffect, useRef } from 'react';

const Chat = ({ email, name }) => {
	const [fetchedMessages] = useRealtimeFetch()

	const lastMessageRef = useRef(null)

	const scrollToBottom = () => {
		lastMessageRef.current.scrollIntoView({ behavior: "smooth" })
	  }

	useEffect(scrollToBottom, [])


	const loadingContent = (
		<div className='mx-auto my-auto'>
			<CircularProgress />
		</div>
	);

	return (
		<div className='w-[750px] h-[650px] px-5 pb-4 pt-8 bg-slate-700 shadow-xl rounded-xl overflow-hidden my-5 flex flex-col gap-3'>
			<div className='flex flex-col-reverse h-full overflow-y-scroll scrollbar px-2'>
			<div ref={lastMessageRef}></div>
				{fetchedMessages.length < 1 && loadingContent}

				{fetchedMessages?.map(message => (
					<Message
						key={message.id}
						email={message.email}
						name={message.name}
						message={message.message}
						yourEmail={email}
					/>
				))}
			</div>
			<MessageForm name={name} email={email} scrollToMessage={scrollToBottom} />
		</div>
	);
};

export default Chat;
