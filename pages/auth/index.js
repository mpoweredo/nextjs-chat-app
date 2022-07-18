import React, { useState } from 'react';
import { getSession } from 'next-auth/react';
import LoginForm from '../../components/auth/LoginForm';
import RegisterForm from '../../components/auth/RegisterForm';

const AuthPage = () => {
	const [isNewUser, setIsNewUser] = useState(true);

	const changeFormHandler = () => {
		setIsNewUser(prevState => !prevState);
	};

	return (
		<div className='w-100 h-screen flex justify-center items-center bg-slate-900'>
			<div className='w-[450px]'>
				<div className='w-full flex flex-col  bg-slate-700 p-5 rounded-md'>
					{isNewUser ? <RegisterForm /> : <LoginForm />}
					<div className='flex mt-3 text-blue-400 text-lg font-medium'>
						<p>
							{isNewUser
								? 'Already have an account? '
								: "Don't have account? Create new "}
							{isNewUser ? (
								<span
									onClick={changeFormHandler}
									className='text-blue-400 font-bold cursor-pointer'>
									Sign in!
								</span>
							) : (
								<span
									onClick={changeFormHandler}
									className='text-blue-400 font-bold cursor-pointer'>
									here!
								</span>
							)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });

	if (session) {
		return {
			redirect: {
				destination: '/chat',
				parmanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
