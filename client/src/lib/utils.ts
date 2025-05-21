import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function generateUniqueRandomNumbers(count: number, min: number, max: number): number[] {
	const uniqueNumbers = new Set<number>()

	while (uniqueNumbers.size < count) {
		const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
		uniqueNumbers.add(randomNum)
	}

	return Array.from(uniqueNumbers)
}
