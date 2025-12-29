import { Link, useParams } from 'react-router-dom'
import playlists from '../data/playlists.json'

const coverImages = import.meta.glob('../assets/covers/*', {
  eager: true,
  import: 'default',
})

function Playlist() {
  const { id } = useParams()
  const playlist = playlists.find((item) => item.id === id)

  if (!playlist) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center gap-4 px-4 text-center text-ink">
        <p className="text-xs uppercase tracking-[0.4em] text-ink/60">Playlist</p>
        <h1 className="text-3xl font-semibold tracking-tight">Not found</h1>
        <Link to="/playlists" className="text-xs uppercase tracking-[0.4em] underline">
          Back to playlists
        </Link>
      </div>
    )
  }

  const coverKey = `../assets/covers/${playlist.cover}`
  const coverSrc = coverImages[coverKey]

  return (
    <div className="bg-paper text-ink">
      <section className="border-b border-ink/10 bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:flex-row sm:gap-16 sm:px-6">
          {coverSrc && (
            <img
              src={coverSrc}
              alt={`${playlist.title} cover art`}
              className="w-full max-w-sm border border-paper/20 object-cover"
            />
          )}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.5em] text-paper/60">{playlist.category}</p>
            <h1 className="text-4xl font-semibold tracking-tight">{playlist.title}</h1>
            <p className="text-paper/70">{playlist.description}</p>
            <div className="border border-paper/20 p-4 text-sm text-paper/70">
              <p className="uppercase tracking-[0.4em] text-paper/50">Curator's Note</p>
              <p className="mt-3 text-paper">{playlist.curatorNote}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="border border-ink/10 bg-ink text-paper">
          <iframe
            title={`${playlist.title} embed`}
            src={playlist.embedUrl}
            className="h-[480px] w-full"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  )
}

export default Playlist

