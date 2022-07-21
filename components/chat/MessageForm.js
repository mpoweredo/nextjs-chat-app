import React, { useState } from 'react';

const MessageForm = ({ name, email, scrollToMessage }) => {
	const [message, setMessage] = useState('');

	console.log();

	const sendMessageHandler = async e => {
		e.preventDefault();
		if (message === '') return;

		const messageObj = {
			message,
			name,
			email,
		};

		try {
			const response = await fetch('/api/chat/SendMessage', {
				method: 'POST',
				body: JSON.stringify(messageObj),
				headers: {
					'Content-Type': 'application/json',
				},
			});
		} catch (error) {
			console.log(error)
		}

		setMessage('');
		scrollToMessage()
	};

	return (
		<div className='w-full mt-auto h-14 bg-neutral-200 rounded-md'>
			<form onSubmit={sendMessageHandler} className='h-full flex'>
				<div className='w-full h-full'>
					<input
						className='w-full h-full outline-none border-transparent rounded-l-md px-4'
						type='text'
						placeholder='Type something...'
						onChange={e => setMessage(e.target.value)}
						value={message}
					/>
				</div>
				<div>
					<button className='flex items-center justify-center h-full w-20 bg-cyan-400 text-cyan-900 font-semibold rounded-r-md'>
						Send
					</button>
				</div>
			</form>
		</div>
	);
};

export default MessageForm;
