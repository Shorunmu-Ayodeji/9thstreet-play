import playlists from '../data/playlists.json'
import PlaylistCard from '../components/PlaylistCard'

function Playlists() {
  return (
    <div className="bg-paper text-ink">
      <section className="border-b border-ink/10 bg-ink/95 text-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs uppercase tracking-[0.5em] text-paper/60">Archive</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Playlists</h1>
          <p className="mt-4 max-w-2xl text-paper/70">
            Crisp black-and-white curation. Hover for subtle motion, click for deeper liner notes.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Playlists

