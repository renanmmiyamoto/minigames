import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'
import { type VariantProps, tv } from 'tailwind-variants'

const buttonVariants = tv({
	base: 'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold text-sm shadow-xs outline-none',
	variants: {
		variant: {
			blue: 'bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-800',
			green:
				'bg-green-600 text-white hover:bg-green-700 focus:bg-green-800 active:bg-green-900',
			slate:
				'bg-slate-600 text-white hover:bg-slate-700 focus:bg-slate-800 active:bg-slate-900',
		},
		size: {
			default: 'px-6 py-2 text-md',
		},
	},
	defaultVariants: {
		variant: 'blue',
		size: 'default',
	},
})

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
	}) {
	const Comp = asChild ? Slot : 'button'

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
