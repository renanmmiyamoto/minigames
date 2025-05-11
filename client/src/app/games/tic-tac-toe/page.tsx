'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { Cell } from './cell'

export default function TicTacToe() {
	const [player, setPlayer] = useState<Values>('X')
	const [board, setBoard] = useState<Board>(emptyBoardFn())
	const [gameOver, setGameOver] = useState<Values>()

	const checkWinner = useCallback(() => {
		let hasWinner: Values

		for (const [a, b, c] of winningCombinations) {
			const valueA = board.get(a)
			if (valueA && valueA === board.get(b) && valueA === board.get(c)) {
				hasWinner = valueA
			}
		}

		if (hasWinner) {
			setGameOver(player)
			toast.success(`Player "${player}" won the game!`, {
				position: 'top-right',
				action: (
					<Button
						onClick={() => {
							resetBoard()
							toast.dismiss()
						}}
						variant="green"
					>
						New game
					</Button>
				),
			})
		}
	}, [board, player])

	const checkTie = useCallback(() => {
		const values = board.values().toArray()
		const hasUndefValue = values.filter((value) => !value)

		if (hasUndefValue.length === 0) {
			toast('The game was a tie!', {
				position: 'top-right',
				action: (
					<Button
						onClick={() => {
							resetBoard()
							toast.dismiss()
						}}
						variant="slate"
					>
						New game
					</Button>
				),
			})
		}
	}, [board])

	const resetBoard = useCallback(() => {
		setPlayer('X')
		setBoard(emptyBoardFn())
		setGameOver(undefined)
	}, [])

	const onClickCell = useCallback(
		(cell: string) => {
			if (board.has(cell) && !board.get(cell) && !gameOver) {
				setPlayer((p) => (p === 'X' ? 'O' : 'X'))
				board.set(cell, player === 'X' ? 'X' : 'O')
				checkWinner()
				checkTie()
			}
		},
		[board, player, gameOver, checkWinner, checkTie],
	)

	return (
		<div className="px-15">
			<h1 className="mb-15 font-semibold text-4xl text-white">Tic Tac Toe</h1>

			<div className="mb-10 flex w-full items-center justify-between">
				<Button variant="slate" onClick={resetBoard}>
					New game
				</Button>
			</div>

			<div
				className={cn(
					'grid max-h-125 w-10/12 max-w-100 grid-cols-3 items-stretch gap-2 sm:gap-4',
				)}
			>
				{[
					...board
						.entries()
						.map(([cell, value]) => (
							<Cell
								key={cell}
								value={value}
								player={player}
								onClick={() => onClickCell(cell)}
								gameOver={gameOver}
							/>
						)),
				]}
			</div>
		</div>
	)
}

export type Values = 'X' | 'O' | undefined
type Board = Map<string, Values>

const rows = ['A', 'B', 'C']
const cols = [1, 2, 3]
const emptyBoardFn: () => Board = () =>
	new Map(rows.flatMap((row) => cols.map((col) => [`${row}${col}`, undefined])))

const winningCombinations = [
	// Rows
	['A1', 'A2', 'A3'],
	['B1', 'B2', 'B3'],
	['C1', 'C2', 'C3'],
	// Columns
	['A1', 'B1', 'C1'],
	['A2', 'B2', 'C2'],
	['A3', 'B3', 'C3'],
	// Diagonals
	['A1', 'B2', 'C3'],
	['A3', 'B2', 'C1'],
]
