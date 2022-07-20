import React, { useEffect, useState } from 'react';
import Message from './Message';
import MessageForm from './MessageForm';
import { CircularProgress } from '@mui/material';
import {
	collection,
	endAt,
	endBefore,
	getDocs,
	limit,
	onSnapshot,
	orderBy,
	query,
	startAfter,
	startAt,
} from 'firebase/firestore';
import { db } from '../../data/firebase';
import useRealtimeFetch from '../../hooks/fetchRealtime';

const fetchmessages = async () => {};

const Chat = ({ email, name }) => {
	const [fetchedMessages, latestDoc] = useRealtimeFetch()
	// const [latestDoc, setLatestDoc] = useState();
	// const [messages, setMessages] = useState([]);

	console.log(fetchedMessages.length);
	// console.log(latestDoc);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const q = query(
	// 			collection(db, 'chat-messages'),
	// 			orderBy('createdAt', 'desc'),
	// 			limit(25)
	// 		);

	// 		const unsubscribe = await onSnapshot(q, querySnapshot => {
	// 			const data = [];
	// 			console.log(querySnapshot);
	// 			setLatestDoc(querySnapshot.docs.length - 1);
	// 			querySnapshot.forEach(doc => {
	// 				data.push({
	// 					...doc.data(),
	// 					id: doc.id,
	// 				});
	// 			});
	// 			setMessages(data);
	// 		});
	// 	};

	// 	fetchData();
	// }, []);

	// const fetchMore = async () => {
	// 	const q = query(
	// 		collection(db, 'chat-messages'),
	// 		orderBy('createdAt', 'asc'),
	// 		startAt(15),
	// 		limit(3),
	// 	);

	// 	const querySnapshot = await getDocs(q)

	// 	querySnapshot.forEach(doc => {
	// 		console.log(doc.data())
	// 	})
	// }

	const loadingContent = (
		<div className='mx-auto my-auto'>
			<CircularProgress />
		</div>
	);

	return (
		<div className='w-[750px] h-[650px] px-5 pb-4 pt-8 bg-slate-700 shadow-xl rounded-xl overflow-hidden my-5 flex flex-col gap-3'>
			<div className='flex flex-col-reverse h-full overflow-y-scroll scrollbar px-2'>
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

			{/* <button onClick={fetchMore}>fetch more</button> */}
			<MessageForm name={name} email={email} />
		</div>
	);
};

export default Chat;
