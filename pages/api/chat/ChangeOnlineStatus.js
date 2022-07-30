import { connectToDatabase } from "../../../utils/db-helpers/connectToDatabase";

const handler = async (req, res) => {
	if (req.method !== 'POST') return;

	const { email, to } = req.body;
    console.log(to)

    try {
        const client = await connectToDatabase()
        const db = client.db()

        const user = await db.collection('users').updateOne(
            {
            email: email,
        }, {$set: {isOnline: to}}
        )
        res.status(200).json({message: user})
    } catch (error) {
        res.status(422).json({ message: error.message });

    }
};

export default handler