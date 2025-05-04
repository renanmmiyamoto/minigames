import type { Metadata } from 'next'
import { JetBrains_Mono, Open_Sans } from 'next/font/google'
import './globals.css'

const openSans = Open_Sans({
	variable: '--font-open-sans',
	subsets: ['latin'],
})

const jetBrainsMono = JetBrains_Mono({
	variable: '--font-jet-brains-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title:
		process.env.NODE_ENV === 'development' ? '[DEV] minigames' : 'minigames',
	description: 'App with minigames',
	icons: [
		{
			rel: 'icon',
			type: 'image/x-icon',
			url: '/favicon-light.ico',
			media: '(prefers-color-scheme: light)',
		},
		{
			rel: 'icon',
			type: 'image/x-icon',
			url: '/favicon-dark.ico',
			media: '(prefers-color-scheme: dark)',
		},
	],
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${openSans.variable} ${jetBrainsMono.variable} bg-background antialiased`}
			>
				{children}
			</body>
		</html>
	)
}
