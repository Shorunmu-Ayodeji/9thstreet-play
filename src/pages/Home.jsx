import { Link } from 'react-router-dom'
import playlists from '../data/playlists.json'
import PlaylistCard from '../components/PlaylistCard'

function Home() {
  const featured = playlists.slice(0, 3)
  const categories = [...new Set(playlists.map((item) => item.category))]

  return (
    <div className="space-y-16 bg-paper text-ink">
      <section className="border-b border-ink/10 bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-24 sm:flex-row sm:items-end sm:px-6">
          <div className="space-y-6 sm:w-2/3">
            <p className="text-xs uppercase tracking-[0.5em] text-paper/70">9thstreet Play</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tighter sm:text-5xl">
              Discover Sound From The Streets.
            </h1>
            <p className="text-lg text-paper/80">Monochrome playlists. Pure vibes.</p>
            <Link
              to="/playlists"
              className="inline-flex items-center border border-paper px-6 py-3 text-xs uppercase tracking-[0.4em]"
            >
              Explore Playlists
            </Link>
          </div>
          <p className="text-sm text-paper/70 sm:w-1/3">
            A culture-driven listening space built with editorial restraint. Sharp typography, strict black and white,
            and playlists curated for concrete corridors everywhere.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Featured Playlists</h2>
          <Link to="/playlists" className="text-xs uppercase tracking-[0.4em] text-ink/70">
            View All
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-4 px-4 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <span
              key={category}
              className="border border-ink px-4 py-2 text-xs uppercase tracking-[0.4em]"
            >
              {category}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home

