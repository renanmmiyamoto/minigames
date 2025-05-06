'use client'

import { menuItems } from '@/components/sidebar'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
	const pathname = usePathname()

	return (
		<header
			className={cn('flex w-full justify-between gap-x-4 p-6', 'sm:hidden')}
		>
			<Link href="/" className="flex items-center justify-center gap-x-3">
				<Image src="/logo.svg" width={32} height={32} alt="Logo minigames" />
				<span className="font-semibold text-white text-xl">minigames</span>
			</Link>

			<Sheet>
				<SheetTrigger className="text-white opacity-70 transition hover:opacity-100 focus:text-blue-600">
					<Menu size={24} />
				</SheetTrigger>

				<SheetContent className={cn('bg-primary-800 text-white')}>
					<SheetHeader>
						<SheetTitle>Menu</SheetTitle>
					</SheetHeader>

					<nav className="w-3/4">
						{menuItems.map((item) => {
							const isCurrentMenu = pathname === item.link

							return (
								<Link
									key={item.title}
									href={item.link}
									className={cn(
										'relative flex cursor-pointer items-center gap-4 rounded-r-md border-primary-800 px-6 py-4 text-white transition',
										'hover:bg-neutral-300/10 focus:bg-neutral-300/10 focus:text-blue-400 active:bg-neutral-300/5',
										isCurrentMenu && 'bg-primary-900! text-white',
										'lg:pr-0',
									)}
								>
									{item.icon}
									<span className="truncate">{item.title}</span>
								</Link>
							)
						})}
					</nav>
				</SheetContent>
			</Sheet>
		</header>
	)
}
