import React from 'react';

const LoggedAs = ({ name }) => {
	return (
		<h1 className='font-bold text-slate-200 text-4xl'>
			Logged in as{' '}
			<span className='text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400'>
				{name}
			</span>
		</h1>
	);
};

export default LoggedAs;
