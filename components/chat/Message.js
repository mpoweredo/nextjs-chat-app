import React from 'react';

const Message = ({ name, email, message, yourEmail }) => {
	return (
		<div className={`${email === yourEmail ? 'self-end' : 'self-start'}  max-w-[82%]`}>
			<div className={`${email !== yourEmail ? 'text-left' : 'text-right'} mb-1 mt-2  text-slate-400`}>{name}</div>
			<div className={`py-2 px-4 ${email === yourEmail ? 'bg-lime-300' : 'bg-sky-300' } text-md shadow-md text-cyan-900 width-auto rounded-sm break-words`}>
				{message}
			</div>
		</div>
	);
};

export default Message;
