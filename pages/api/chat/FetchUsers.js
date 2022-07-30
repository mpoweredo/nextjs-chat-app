import { connectToDatabase } from "../../../utils/db-helpers/connectToDatabase";

const handler = async (req, res) => {
	if (req.method !== 'GET') return;

    try {
        const client = await connectToDatabase()
        const db = client.db()

        const users = await db.collection("users")
        .find({})
        .toArray();
        res.status(200).json({message: users})
    } catch (error) {
        res.status(422).json({ message: error.message });

    }
};

export default handler