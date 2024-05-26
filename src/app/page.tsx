import Link from 'next/link'

export default function HomePage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[url('/images/background.jpg')] bg-cover px-3 text-[#070427]">
			<div className='grid gap-1'>
				<h1 className='font-black text-5xl'>
					TEST <span className='font-medium'>Open</span>
				</h1>
				<p className='text-center text-xl italic'>Coming Back in 2025</p>
			</div>

			<p className='text-center text-sm'>
				Looking for TEST Open 2024? Check out the previous site{' '}
				<Link href='https://2024.test-open.com' className='underline'>
					here
				</Link>
				.
			</p>
		</main>
	)
}
