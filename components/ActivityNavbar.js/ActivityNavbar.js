import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';

const ActivityNavbar = () => {
	const [activityUsers, setActivityUsers] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/chat/FetchUsers');
				const users = await response.json();
				console.log(users);
				setActivityUsers(users.message);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
	}, []);

	return (
		<div className='absolute w-[250px] h-screen bg-zinc-800 shadow-inner hidden lg:flex flex-col items-center pt-5 px-3'>
			<h1 className='font-bold text-white text-2xl'>Active Users</h1>
			<ul className='w-full flex flex-col gap-5 mt-5'>
				{!!activityUsers.length &&
					activityUsers.map(user => (
						<UserCard name={user.name} isOnline={user.isOnline} key={user._id} />
					))}
			</ul>
		</div>
	);
};

export default ActivityNavbar;
