'use client'

import { Button } from '@/components/ui/button'
import { useEffect, useRef } from 'react'

interface Props {
	track: object
}

export function Player({ track }: Props) {
	const audioRef = useRef<HTMLAudioElement | null>(null)

	const handlePlay = () => {
		audioRef.current?.play().catch((error) => {
			console.error('Autoplay was prevented:', error)
		})
		setTimeout(() => audioRef.current?.pause(), 2000)
	}

	const handlePause = () => {
		audioRef.current?.pause()
	}

	// useEffect(() => {
	// 	const audio = audioRef.current
	// 	if (audio) {
	// 		const handleInteraction = () => {
	// 			handlePlay()
	// 			document.removeEventListener('click', handleInteraction)
	// 			document.removeEventListener('touchstart', handleInteraction)
	// 		}

	// 		document.addEventListener('click', handleInteraction)
	// 		document.addEventListener('touchstart', handleInteraction)

	// 		return () => {
	// 			document.removeEventListener('click', handleInteraction)
	// 			document.removeEventListener('touchstart', handleInteraction)
	// 		}
	// 	}
	// }, [handlePlay])

	return (
		<>
			<iframe
				src={track.preview}
				allow="autoplay"
				id="iframeAudio"
				title="iframeAudio"
			/>

			<audio ref={audioRef} src={track.preview} autoPlay controls>
				<track
					kind="captions"
					src="/path/to/your/captions.vtt"
					srcLang="en"
					label="English captions"
					default
				/>
			</audio>

			<div>
				<Button type="button" onClick={handlePlay}>
					Play
				</Button>

				<Button type="button" onClick={handlePause}>
					Pause
				</Button>
			</div>
		</>
	)
}
