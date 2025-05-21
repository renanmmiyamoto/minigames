'use client'

import type { DeezerPlaylist } from '@/lib/deezer-api'
import { generateUniqueRandomNumbers } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

async function getPlaylistData(playlistId: string) {
	return fetch(`/games/guess-song/${playlistId}/api`).then(async (res) => (await res.json()) as DeezerPlaylist)
}

export default function PlaylistGame() {
	const { playlist_id } = useParams<{ playlist_id: string }>()

	const { data, isLoading } = useQuery({
		queryKey: ['playlist'],
		queryFn: () => getPlaylistData(playlist_id),
	})

	console.log({ data, isLoading })

	if (!data) return null

	const randomTracks = generateUniqueRandomNumbers(10, 0, data.tracks.data.length || 100).map(
		(randomIdx) => data.tracks.data[randomIdx],
	)

	console.log({
		albums: randomTracks.map((track) => track.album),
	})

	return (
		<div className="flex flex-wrap gap-4">
			{randomTracks.map((track) => (
				<div key={track.id} className="flex max-w-32 flex-col gap-2 overflow-hidden">
					<img src={track.album.cover_big} alt={track.title} className="w-32 rounded" />
					<h3 className="w-full truncate font-semibold text-lg text-white">{track.title}</h3>
					<p className="truncate text-gray-500 text-sm">{track.artist.name}</p>
				</div>
			))}
		</div>
	)
}
