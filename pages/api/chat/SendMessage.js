import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../data/firebase";

const handler = async (req, res) => {
	if (req.method !== 'POST') return;

	const { message, name, email } = req.body;

    if (message.trim() === '') {
        res.status(422).json({message: 'Invalid input.'})
        return
    }

    try {
        await addDoc(collection(db, 'chat-messages'), {
            message,
            name,
            email,
            createdAt: serverTimestamp()
        })
        res.status(200).json()
        return
    } catch (error) {
        res.status(422).json({message: error.message})
        return 
    }


};


export default handler


