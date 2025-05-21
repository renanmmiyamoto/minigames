export const baseURL = 'https://api.deezer.com'

export interface DeezerChart {
	tracks: DeezerPaginatedList<DeezerTrack>
	albums: DeezerPaginatedList<DeezerAlbum>
	artists: DeezerPaginatedList<DeezerArtist>
	playlists: DeezerPaginatedList<DeezerPlaylist>
}

export interface DeezerPaginatedList<T> {
	data: T[]
	total: number
	next?: string // URL to the next page
}

export interface DeezerTrack {
	id: number
	title: string
	preview: string
	duration: number
	link: string
	rank: number
	artist: DeezerArtist
	album: DeezerAlbum
}

export interface DeezerAlbum {
	id: number
	title: string
	cover: string
	cover_medium: string
	cover_big: string
	tracklist: string
}

export interface DeezerArtist {
	id: number
	name: string
	picture: string
	picture_medium: string
	picture_big: string
	tracklist: string
}

export interface DeezerPlaylist {
	id: number
	title: string
	description?: string
	duration: number
	nb_tracks: number
	picture: string
	picture_medium: string
	picture_big: string
	tracklist: string
	link: string
	creator: {
		id: number
		name: string
		tracklist: string
	}
	tracks: {
		data: DeezerTrack[]
	}
}

export async function getCharts() {
	const response = await fetch(`${baseURL}/chart`)
	return (await response.json()) as DeezerChart
}

export async function getPlaylistById(id: string) {
	const response = await fetch(`${baseURL}/playlist/${id}`)
	return (await response.json()) as DeezerPlaylist
}
