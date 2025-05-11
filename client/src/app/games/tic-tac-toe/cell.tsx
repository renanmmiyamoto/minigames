import type { Values } from '@/app/games/tic-tac-toe/page'
import { O } from '@/icons/tic-tac-toe/o'
import { X } from '@/icons/tic-tac-toe/x'
import { cn } from '@/lib/utils'

export interface CellProps {
	value: Values
	player: Values
	onClick: () => void
	gameOver?: Values
}

export function Cell({ value, onClick, player, gameOver }: CellProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				'flex aspect-square select-none items-center justify-center rounded-2xl bg-neutral-300 text-7xl mix-blend-exclusion transition duration-100',
				!gameOver && !value && 'cursor-pointer hover:bg-neutral-400',
				value === 'X' && 'bg-rose-400',
				value === 'O' && 'bg-cyan-300',
				!gameOver && !value && player === 'X' && 'hover:bg-rose-400',
				!gameOver && !value && player === 'O' && 'hover:bg-cyan-300',
			)}
		>
			{value === 'X' && <X className="size-15" />}
			{value === 'O' && <O className="size-15" />}
		</button>
	)
}
