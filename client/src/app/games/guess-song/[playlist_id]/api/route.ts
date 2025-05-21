import { getPlaylistById } from '@/lib/deezer-api'

export async function GET(_request: Request, { params }: { params: Promise<{ playlist_id: string }> }) {
	const { playlist_id } = await params
	const data = await getPlaylistById(playlist_id)

	return Response.json(data)
}
