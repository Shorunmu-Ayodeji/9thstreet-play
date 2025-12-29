import { Link } from 'react-router-dom'

const coverImages = import.meta.glob('../assets/covers/*', {
  eager: true,
  import: 'default',
})

function PlaylistCard({ playlist }) {
  const coverKey = `../assets/covers/${playlist.cover}`
  const coverSrc = coverImages[coverKey]

  return (
    <article className="group flex flex-col border border-paper/10 bg-paper p-4 text-ink transition hover:-translate-y-0.5 hover:border-paper/40">
      {coverSrc && (
        <img
          src={coverSrc}
          alt={`${playlist.title} cover art`}
          className="aspect-square w-full border border-ink/20 object-cover"
        />
      )}
      <div className="mt-4 flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.4em] text-ink/60">{playlist.category}</p>
        <h3 className="text-xl font-semibold tracking-tight">{playlist.title}</h3>
        <p className="text-sm text-ink/70">{playlist.description}</p>
        <Link
          to={`/playlists/${playlist.id}`}
          className="mt-4 inline-flex items-center text-xs uppercase tracking-[0.4em] text-ink"
        >
          View Playlist →
        </Link>
      </div>
    </article>
  )
}

export default PlaylistCard

