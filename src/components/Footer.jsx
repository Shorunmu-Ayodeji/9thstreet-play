function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="uppercase tracking-[0.3em]">9THSTREET PLAY</p>
        <div className="space-y-1 text-paper/60 sm:text-right">
          <p>Editorial playlists from the monochrome underground.</p>
          <p>© {year} 9thstreet Play. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

