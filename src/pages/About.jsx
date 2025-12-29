const team = [
  {
    name: 'Jules A.',
    role: 'Lead Curator',
    bio: 'Architect of the monochrome mood boards. Finds gems between subway stops.',
  },
  {
    name: 'Mara K.',
    role: 'Editorial Director',
    bio: 'Shapes the storytelling, ensures every playlist lands like a cover story.',
  },
]

function About() {
  return (
    <div className="bg-paper text-ink">
      <section className="border-b border-ink/10 bg-ink text-paper">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <p className="text-xs uppercase tracking-[0.5em] text-paper/60">About</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">What is 9thstreet Play?</h1>
          <div className="mt-6 space-y-4 text-paper/80">
            <p>
              9thstreet Play is a modern playlist-curation studio focused on culture-first, black-and-white storytelling.
              We highlight global street sounds, independent releases, and monochrome aesthetics that feel editorial and
              timeless.
            </p>
            <p>
              Every playlist is researched, sequenced, and released with purpose. We study liner notes, talk with
              artists, and design the listening flow like a gallery experience.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">Mission</h2>
        <p className="mt-4 text-ink/70">
          To give under-represented sounds a sharp stage. No color, no clutter—just a bold typographic space where music
          and context meet.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {team.map((member) => (
            <article key={member.name} className="border border-ink/10 bg-paper p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-ink/60">{member.role}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{member.name}</h3>
              <p className="mt-3 text-ink/70">{member.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About

