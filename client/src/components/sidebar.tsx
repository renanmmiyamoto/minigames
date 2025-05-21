'use client'

import { cn } from '@/lib/utils'
import { Brain, Hash, House, Music } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const menuItems = [
	{
		icon: <House size={22} />,
		title: 'Home',
		link: '/',
	},
	{
		icon: <Hash size={22} />,
		title: 'Tic tac toe',
		link: '/games/tic-tac-toe',
	},
	{
		icon: <Brain size={22} />,
		title: 'Memory Match',
		link: '/games/memory-match',
	},
	{
		icon: <Music size={22} />,
		title: 'Guess the song',
		link: '/games/guess-song',
	},
] as const

export function Sidebar() {
	const pathname = usePathname()

	return (
		<aside
			className={cn(
				'scrollbar hidden max-h-screen w-20 flex-col gap-y-15 overflow-y-auto bg-primary-800 pt-15 pl-2',
				'sm:flex',
				'lg:w-3/12 lg:min-w-2xs lg:max-w-80 lg:pl-10',
			)}
		>
			<Link
				href="/"
				className="group mx-auto flex items-center justify-center gap-x-3 lg:mx-0 lg:justify-start lg:transition lg:hover:translate-x-2"
			>
				<Image src="/logo.svg" width={32} height={32} alt="Logo minigames" />
				<span className="hidden font-semibold text-white text-xl opacity-70 transition group-hover:opacity-100 lg:block">
					minigames
				</span>
			</Link>

			<nav>
				{menuItems.map((item) => {
					const isCurrentMenu = pathname === item.link

					return (
						<Link
							key={item.title}
							href={item.link}
							className={cn(
								'relative flex cursor-pointer items-center gap-4 rounded-l-md border-primary-800 px-6 py-4 text-white transition',
								'hover:bg-neutral-300/10 focus:bg-neutral-300/10 focus:text-blue-400 active:bg-neutral-300/5',
								isCurrentMenu && 'bg-primary-900! text-white',
								'lg:pr-0',
							)}
						>
							{item.icon}
							<span className="hidden truncate lg:block">{item.title}</span>
						</Link>
					)
				})}
			</nav>
		</aside>
	)
}
