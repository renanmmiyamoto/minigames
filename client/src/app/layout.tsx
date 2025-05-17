import type { Metadata } from 'next'
import { JetBrains_Mono, Open_Sans } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'

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
				className={cn(
					`${openSans.variable} ${jetBrainsMono.variable} flex min-h-screen w-screen flex-col items-stretch bg-primary-900 antialiased sm:overflow-hidden`,
					'sm:flex-row',
				)}
			>
				<Sidebar />
				<Header />

				<div
					className={cn(
						'scrollbar w-full overflow-y-auto py-8 sm:max-h-screen md:py-15',
					)}
				>
					{children}
				</div>

				<Toaster richColors />
			</body>
		</html>
	)
}
