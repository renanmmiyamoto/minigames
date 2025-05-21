import { PlaylistList } from '@/app/games/guess-song/playlist-list'

export default function GuessSong() {
	return (
		<div className="flex h-full w-full flex-col gap-8 px-6 md:px-15 lg:w-11/12">
			<h1 className="mb-5 font-semibold text-4xl text-white">Guess the song</h1>

			<PlaylistList />
		</div>
	)
}
