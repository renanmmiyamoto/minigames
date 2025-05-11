import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

export const O = (props: ComponentProps<'svg'>) => {
	return (
		<svg
			role="img"
			aria-label="O"
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			className={cn('fill-current stroke-current', props.className)}
		>
			<circle strokeWidth={18} cx={50} cy={50} r={35} fill="transparent" />
		</svg>
	)
}
