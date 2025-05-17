import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface Props {
	className?: string
	selected?: boolean
	matched?: boolean
	onClick?: () => void
	children?: ReactNode
}

export function Card({
	className,
	children,
	onClick,
	selected,
	matched,
}: Props) {
	return (
		<button
			type="button"
			className={cn(
				'perspective-distant h-28 sm:h-full',
				onClick && 'cursor-pointer',
			)}
			onClick={!matched && !selected ? onClick : undefined}
			onKeyDown={(e) => {
				if (!matched && !selected && (e.key === 'Enter' || e.key === ' ')) {
					onClick?.()
				}
			}}
		>
			<div
				className={cn(
					'transform-3d relative size-full font-semibold text-base transition-transform duration-300',
					(matched || selected) && 'rotate-y-180',
				)}
			>
				<div
					className={cn(
						'backface-hidden absolute flex size-full items-center justify-center rounded-md bg-neutral-300 bg-fixed transition hover:bg-neutral-400',
						'bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:15px_15px] [--pattern-fg:var(--color-neutral-500)]/50',
					)}
				/>

				<div
					className={cn(
						'backface-hidden absolute flex size-full rotate-y-180 items-center justify-center rounded-md text-white',
						matched ? 'bg-green-300' : 'bg-cyan-200',
					)}
				>
					{children}
				</div>
			</div>
		</button>
	)
}
