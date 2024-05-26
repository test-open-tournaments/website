import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'TEST Open',
	description: "TEST Open, osu!'s only large scale lazer tournament."
}

interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				{children}
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	)
}
