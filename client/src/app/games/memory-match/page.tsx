'use client'

import { Card } from '@/app/games/memory-match/card'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface ICard {
	id: string
	value: IconName
	selected?: boolean
	matched?: boolean
}

export default function MemoryMatch() {
	const [totalPairs, setTotalPairs] = useState('4')
	const [count, setCount] = useState(0)
	const [pairs, setPairs] = useState<ICard[]>([])

	useEffect(() => {
		setPairs(generatePairs(Number(totalPairs)))
	}, [totalPairs])

	const handleSelectCard = useCallback(
		(card: ICard) => {
			const selectedCards = pairs.filter((item) => !!item.selected)
			if (selectedCards.length === 2) return

			setPairs((prev) =>
				prev.map((item) => (item.id === card.id ? { ...item, selected: true } : item)),
			)

			if (selectedCards.length === 1) {
				setCount((prev) => prev + 1)
				const matchedSelectedCard = selectedCards.find((item) => item.value === card.value)
				if (matchedSelectedCard) {
					setPairs((prev) =>
						prev.map((item) =>
							item.value === card.value ? { ...item, selected: false, matched: true } : item,
						),
					)
					return
				}

				setTimeout(() => {
					setPairs((prev) => prev.map((item) => ({ ...item, selected: false })))
				}, 1000)
				return
			}

			setPairs((prev) =>
				prev.map((item) => (item.id === card.id ? { ...item, selected: true } : item)),
			)
		},
		[pairs],
	)

	useEffect(() => {
		if (pairs.length && pairs.every((card) => card.matched)) {
			toast.success('You won the game!', {
				position: 'top-right',
				action: (
					<Button
						onClick={() => {
							newGame()
							toast.dismiss()
						}}
						variant="green"
						className="ml-auto"
					>
						New game
					</Button>
				),
			})
		}
	}, [pairs])

	const newGame = useCallback(() => {
		setPairs(generatePairs(Number(totalPairs)))
		setCount(0)
	}, [totalPairs])

	return (
		<div className="flex h-full w-full flex-col gap-8 px-6 md:px-15 lg:w-11/12">
			<h1 className="mb-5 font-semibold text-4xl text-white">Memory Match</h1>

			<div className="block w-full justify-between gap-2 sm:flex sm:items-center md:gap-4 lg:gap-6">
				<Button variant="slate" onClick={newGame} className="mb-6 sm:m-0">
					New game
				</Button>

				<span className="block text-white">Tries: {count}</span>

				<div className="flex items-center gap-4">
					<span className="text-white">Number of pairs: </span>

					<Select defaultValue={totalPairs} onValueChange={setTotalPairs}>
						<SelectTrigger>
							<SelectValue placeholder="Number of pairs" />
						</SelectTrigger>

						<SelectContent>
							<SelectItem value="4">4</SelectItem>
							<SelectItem value="8">8</SelectItem>
							<SelectItem value="12">12</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="grid h-full grid-cols-4 gap-2 sm:gap-4 md:gap-6">
				{pairs?.map((card) => (
					<Card
						key={card.id}
						selected={card.selected}
						matched={card.matched}
						onClick={() => handleSelectCard(card)}
					>
						<DynamicIcon name={card.value} className="size-12 stroke-primary-800 md:size-15" />
					</Card>
				))}
			</div>
		</div>
	)
}

const generatePairs = (length = 5) => {
	const possibleIcons: IconName[] = [
		'bird',
		'bone',
		'bug',
		'cat',
		'fish',
		'origami',
		'rabbit',
		'rat',
		'snail',
		'squirrel',
		'turtle',
		'worm',
	]
	const icons = possibleIcons.sort(() => Math.random() - 0.5).slice(0, length)

	return icons
		.concat(icons)
		.sort(() => Math.random() - 0.5)
		.map((value, idx) => ({
			id: `${value}:${idx}`,
			value,
		}))
}
