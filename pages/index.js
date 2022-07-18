import { router } from 'next/router';
import Button from '../components/UI/Button';
import Link from 'next/link';

export default function Home() {
	return (
		<div className='flex items-center flex-col gap-6 justify-center bg-slate-900 w-100 h-screen'>
			<div className='w-2/5 bg-slate-800 rounded-md h-[500px]'></div>
			<Button classes='w-48 h-16 rounded-sm bg-slate-700 shadow-lg'>
				<Link href='/auth'>
					<h1 className='font-bold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500'>
						Let's chat!
					</h1>
				</Link>
			</Button>
		</div>
	);
}
