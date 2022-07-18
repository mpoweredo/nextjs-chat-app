import {
	hashPassword,
	validateEmail,
	validateName,
	validatePassword,
} from '../../../utils/auth-helpers/auth';
import { connectToDatabase } from '../../../utils/db-helpers/connectToDatabase';

const handler = async (req, res) => {
	if (req.method !== 'POST') return;

	const { email, password, name } = req.body;
	console.log(email, password, name);
	const isEmailValid = validateEmail(email);
	const isPasswordValid = validatePassword(password);
	const isNameValid = validateName(name);

	if (!isEmailValid) {
		res.status(422).json({ message: 'It is not an email!' });
		return;
	}

	if (!isPasswordValid.isValid) {
		res.status(422).json({ message: isPasswordValid.error });
		return;
	}

	if (!isNameValid.isValid) {
		res.status(422).json({ message: isNameValid.error });
		return;
	}

	try {
		const client = await connectToDatabase();

		const db = client.db();
		const userExist = await db.collection('users').findOne({ email });

		if (userExist) {
			res.status(422).json({ message: 'User already exist!' });
			client.close();
			return;
		}

		const hashedPassword = await hashPassword(password);

		const result = await db.collection('users').insertOne({
			email,
			password: hashedPassword,
			name,
		});
	} catch (error) {
		throw new Error('Couldnt log to database!');
	}

	res
		.status(200)
		.json({ message: 'User created!', userData: { email, password, name } });
};

export default handler;
