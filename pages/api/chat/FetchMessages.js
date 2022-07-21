import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../data/firebase';

const handler = async (req, res) => {
	if (req.method !== 'GET') return;

	try {
		const fetchData = async () => {
			const q = query(
				collection(db, 'chat-messages'),
				orderBy('createdAt'),
				limit(15)
			);

			const unsubscribe = onSnapshot(q, querySnapshot => {
				const cities = [];
				querySnapshot.forEach(doc => {
					cities.push(doc.data());
				});
				setMessages(cities);
			});
		};
		res.status(200).json({ message: data });
	} catch (error) {
		res.status(422).json({ message: error.message });
	}
};

export default handler;
