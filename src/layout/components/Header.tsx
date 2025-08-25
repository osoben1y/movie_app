import { Search, House, Clapperboard, Menu, Heart, Sun, Moon } from "lucide-react";
import Logo from "../../shared/assets/header_logo.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../../shared/theme/ThemeProvider";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[var(--header-bg)] border-b border-[var(--border)] flex justify-center">
      <div className="container max-w-[1920px] h-[80px] flex items-center justify-between px-4">
        <NavLink to="/">
          <img src={Logo} alt="Logo" className="h-10" />
        </NavLink>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className="hover:text-red-500 flex items-center gap-2">
            <House className="w-4 h-4" /> Сеансы
          </NavLink>
          <NavLink to="/movie" className="hover:text-red-500 flex items-center gap-2">
            <Clapperboard className="w-4 h-4" /> Фильмы
          </NavLink>
          <NavLink to="/search" className="hover:text-red-500 flex items-center gap-2">
            <Search className="w-4 h-4" /> Поиск
          </NavLink>
          <NavLink to="/favourites" className="hover:text-red-500 flex items-center gap-2">
            <Heart className="w-4 h-4" /> Избранное
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 rounded-sm overflow-hidden">
              <div className="w-full h-1/3 bg-white"></div>
              <div className="w-full h-1/3 bg-blue-500"></div>
              <div className="w-full h-1/3 bg-red-500"></div>
            </div>
            <span className="text-sm text-[color:var(--muted-fg)]">RU</span>
          </div>

          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-[var(--border)] hover:bg-[var(--card-bg)] transition-colors"
            title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <NavLink
            to="/auth"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md hidden md:block"
          >
            Войти
          </NavLink>

          <button onClick={() => setOpen(!open)} className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute top-[80px] left-0 w-full bg-[var(--bg)]/95 border-t border-[var(--border)] p-4 md:hidden">
          <NavLink to="/" className="block py-2 hover:text-red-500">Сеансы</NavLink>
          <NavLink to="/movie" className="block py-2 hover:text-red-500">Фильмы</NavLink>
          <NavLink to="/search" className="block py-2 hover:text-red-500">Поиск</NavLink>
          <NavLink to="/favourites" className="block py-2 hover:text-red-500">Избранное</NavLink>
          <NavLink
            to="/auth"
            className="block py-2 bg-red-600 text-center rounded-md text-white mt-4"
          >
            Войти
          </NavLink>
        </div>
      )}
    </header>
  );
}
