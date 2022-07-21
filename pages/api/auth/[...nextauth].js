import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../utils/auth-helpers/auth';
import { connectToDatabase } from '../../../utils/db-helpers/connectToDatabase';

export default NextAuth({
	session: {
		jwt: true,
	},
	secret: process.env.SECRET,
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				const { password, email } = credentials;

				try {
					const client = await connectToDatabase();

					const userCollection = await client.db().collection('users');
					const user = await userCollection.findOne({
						email: email,
					});

					if (!user) {
						client.close();
						throw new Error("User does not exist!");
					}

					const isValid = await verifyPassword(password, user.password);

					if (!isValid) {
						client.close();
						throw new Error('Password is incorrect!');
					}

					client.close();
					return { email: user.email, name: user.name };
				} catch (error) {
					throw new Error(error.message);
				}
			},
		}),
	],
});
