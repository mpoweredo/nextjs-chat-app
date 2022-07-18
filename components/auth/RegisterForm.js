import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { signIn } from 'next-auth/react';
import { EMAILREGEX } from '../../data/consts';

const RegisterForm = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const signInHandler = async data => {
		setLoading(true);
		const { email, name, password } = data;

		console.log(email, name, password);

		try {
			const signUpResult = await fetch('/api/auth/SignUp', {
				method: 'POST',
				body: JSON.stringify({ email, password, name }),
				headers: {
					'Content-Type': 'application/json',
				},
			});

            const data = await signUpResult.json();
			
			if (data.message === 'User already exist!') {
				enqueueSnackbar(data.message, {
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right',
					},
					variant: 'error',
				});
                setLoading(false)
				return;
			}

			const signInResult = await signIn('credentials', {
				redirect: false,
				email: data.userData.email,
				password: data.userData.password,
			});
			enqueueSnackbar('Account created successfully!', {
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
				variant: 'success',
			});
			router.push('/chat');
		} catch (error) {
			const errMsg = error.message;
			enqueueSnackbar(errMsg, {
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
				variant: 'error',
			});
		}
	};

	return (
		<div className='w-100 h-full'>
				<form
					onSubmit={handleSubmit(signInHandler)}
					className='flex w-100 flex-col gap-3'>
					<div className='flex w-100 flex-col'>
						<label
							htmlFor='name'
							className='text-2xl font-bold text-slate-50 mb-2'>
							Name
						</label>
						<input
							{...register('name', { required: true, minLength: 3 })}
							className='px-2 w-full bg-slate-500 focus:bg-slate-400 text-slate-50 h-10 outline-none text-lg outline-transparent rounded-sm'
							type='name'
							id='name'
						/>
						{errors.name?.type === 'required' && (
							<p className='mt-2 text-red-400 font-medium'>
								Input cannot be empty!
							</p>
						)}
						{errors.name?.type === 'minLength' && (
							<p className='mt-2 text-red-400 font-medium'>
								Input must contain atleast 3 characters
							</p>
						)}
					</div>
					<div className='flex flex-col'>
						<label
							htmlFor='email'
							className='text-2xl font-bold text-slate-50 mb-2'>
							Email
						</label>
						<input
							{...register('email', { required: true, pattern: EMAILREGEX })}
							className='px-2 w-full bg-slate-500 focus:bg-slate-400 text-slate-50 h-10 outline-none text-lg outline-transparent rounded-sm'
							type='email'
							id='email'
						/>
						{errors.email?.type === 'required' && (
							<p className='mt-2 text-red-400 font-medium'>
								Input cannot be empty!
							</p>
						)}
						{errors.email?.type === 'pattern' && (
							<p className='mt-2 text-red-400 font-medium'>
								Thats not an email!
							</p>
						)}
					</div>
					<div className='flex flex-col'>
						<label
							htmlFor='password'
							className='text-2xl font-bold text-slate-50 mb-2'>
							Password
						</label>
						<input
							{...register('password', { required: true, minLength: 7 })}
							className='px-2 w-full bg-slate-500 focus:bg-slate-400 text-slate-50 h-10 outline-none text-lg outline-transparent rounded-sm'
							type='password'
							id='password'
						/>
						{errors.password?.type === 'required' && (
							<p className='mt-2 text-red-400 font-medium'>
								Input cannot be empty!
							</p>
						)}
						{errors.password?.type === 'minLength' && (
							<p className='mt-2 text-red-400 font-medium'>
								Input must contain atleast 7 characters!
							</p>
						)}
					</div>

					<button
						disabled={loading}
						className='px-2 w-full hover:bg-slate-900 bg-slate-800 flex justify-center items-center text-slate-50 h-12 text-lg font-bold rounded-sm'>
						{loading ? (
							<CircularProgress size={28} className='text-slate-300' />
						) : (
							'Sign up'
						)}
					</button>
				</form>
		</div>
	);
};

export default RegisterForm;
