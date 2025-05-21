'use client'

import { Input } from '@/components/ui/input'
import type { DeezerPlaylist } from '@/lib/deezer-api'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'

async function getTopPlaylists(search?: string) {
	return fetch(`/games/guess-song/api?search=${search}`).then(
		async (res) => (await res.json()) as DeezerPlaylist[],
	)
}

export function PlaylistList() {
	const [search, setSearch] = useState('')
	const { data: topPlaylists, isLoading } = useQuery({
		queryKey: ['topPlaylists', search],
		queryFn: () => getTopPlaylists(search),
	})

	console.log({ isLoading, topPlaylists })

	return (
		<div>
			<Input
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search a Deezer playlist"
				className="mb-6 md:w-1/2"
			/>

			<div className="grid grid-cols-2 gap-4 md:grid-cols-5">
				{topPlaylists?.map((playlist) => (
					<Playlist key={playlist.id} playlist={playlist} />
				))}
			</div>
		</div>
	)
}

function Playlist({ playlist }: { playlist: DeezerPlaylist }) {
	return (
		<Link key={playlist.id} href={`/games/guess-song/${playlist.id}`}>
			<img src={playlist.picture_big} alt={playlist.title} className="w-full rounded" />
		</Link>
	)
}
