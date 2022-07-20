import { router } from 'next/router';
import Button from '../components/UI/Button';
import Link from 'next/link';

export default function Home() {
	return (
		<div className='flex items-center flex-col gap-6 justify-center bg-zinc-900 w-100 h-screen'>
			<h1 className='text-slate-50 text-5xl font-extrabold '>Start chatting with every one right now!</h1>
			<Button classes='w-48 h-16 rounded-sm bg-slate-800 shadow-2xl shadow-teal-500/10 hover:bg-gray-900'>
				<Link href='/auth'>
					<h1 className='font-bold text-transparent bg-clip-text text-2xl bg-gradient-to-r from-teal-400 to-blue-500'>
						Let's chat!
					</h1>
				</Link>
			</Button>
		</div>
	);
}
