import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Playlists', to: '/playlists' },
  { label: 'Submit', to: '/submit' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const linkClasses = ({ isActive }) =>
  `text-sm uppercase tracking-[0.25em] ${
    isActive ? 'text-paper' : 'text-paper/70'
  } transition hover:text-paper`

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-paper/10 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <NavLink to="/" className="text-base font-semibold tracking-tight text-paper">
          9THSTREET PLAY
        </NavLink>
        <button
          className="flex h-10 w-10 items-center justify-center border border-paper/40 text-paper sm:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="text-lg">{open ? '×' : '≡'}</span>
        </button>
        <nav className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
      {open && (
        <nav className="border-t border-paper/10 bg-ink sm:hidden">
          <div className="flex flex-col px-4 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `py-3 text-xs uppercase tracking-[0.4em] ${
                    isActive ? 'text-paper' : 'text-paper/70'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

export default Navbar

