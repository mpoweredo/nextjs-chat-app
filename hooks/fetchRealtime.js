import {
	collection,
	endAt,
	endBefore,
	limit,
	onSnapshot,
	orderBy,
	query,
    startAfter,
	startAt,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../data/firebase';

const useRealtimeFetch = () => {
    const [latestDoc, setLatestDoc] = useState(null)
	const [fetchedData, setFetchedData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const q = query(
				collection(db, 'chat-messages'),
				orderBy('createdAt', 'desc'),
				limit(25),
			);

			const unsubscribe = await onSnapshot(q, querySnapshot => {
				const data = [];
				console.log(querySnapshot)
				setLatestDoc(querySnapshot.docs.length - 1)
				querySnapshot.forEach(doc => {
					data.push({
                        ...doc.data(),
                        id: doc.id
                    });
				});
				setFetchedData(data);
			});
		};

		fetchData();
	}, []);

	return [fetchedData, latestDoc];
};

export default useRealtimeFetch;
