import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

function Input({ className, type, ...props }: ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				'flex w-full min-w-0 rounded-md border-1 border-white bg-transparent px-4 py-2 text-base text-white shadow-xs outline-none transition-[color,box-shadow] placeholder:text-neutral-400 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				'focus-visible:border-blue-200',
				className,
			)}
			{...props}
		/>
	)
}

export { Input }
