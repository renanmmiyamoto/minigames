import {
	type DeezerChart,
	type DeezerPaginatedList,
	type DeezerPlaylist,
	baseURL,
} from '@/lib/deezer-api'
import type { NextRequest } from 'next/server'

async function getCharts() {
	const response = await fetch(`${baseURL}/chart`)
	return (await response.json()) as DeezerChart
}

export async function getPlaylistById(id: string) {
	const response = await fetch(`${baseURL}/playlist/${id}`)
	return (await response.json()) as DeezerPlaylist
}

async function getPlaylistBySearch(search: string) {
	const response = await fetch(`${baseURL}/search/playlist?q=${search}`)
	return (await response.json()) as DeezerPaginatedList<DeezerPlaylist>
}

export async function GET(request: NextRequest) {
	const search = request.nextUrl.searchParams.get('search')

	if (search) {
		const data = await getPlaylistBySearch(search)
		return Response.json(data.data)
	}

	const topGlobals = await getPlaylistById('3155776842')
	const charts = await getCharts()

	return Response.json([topGlobals, ...charts.playlists.data.slice(0, 9)])
}
