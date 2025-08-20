import { Search, House, Clapperboard, Menu } from "lucide-react";
import Logo from "../../shared/assets/header_logo.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/80 border-b border-gray-800 flex justify-center">
      <div className="container max-w-[1920px] h-[80px] flex items-center justify-between px-4">
        <NavLink to="/">
          <img src={Logo} alt="Logo" className="h-10" />
        </NavLink>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className="text-white hover:text-red-500 flex items-center gap-2">
            <House className="w-4 h-4" /> Сеансы
          </NavLink>
          <NavLink to="/movie" className="text-white hover:text-red-500 flex items-center gap-2">
            <Clapperboard className="w-4 h-4" /> Фильмы
          </NavLink>
          <NavLink to="/" className="text-white hover:text-red-500 flex items-center gap-2">
            <Search className="w-4 h-4" /> Поиск
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 rounded-sm overflow-hidden">
              <div className="w-full h-1/3 bg-white"></div>
              <div className="w-full h-1/3 bg-blue-500"></div>
              <div className="w-full h-1/3 bg-red-500"></div>
            </div>
            <span className="text-white text-sm">RU</span>
          </div>

          <NavLink
            to="/auth"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md hidden md:block"
          >
            Войти
          </NavLink>

          <button onClick={() => setOpen(!open)} className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute top-[80px] left-0 w-full bg-black/95 border-t border-gray-800 p-4 md:hidden">
          <NavLink to="/" className="block py-2 text-white hover:text-red-500">Сеансы</NavLink>
          <NavLink to="/movie" className="block py-2 text-white hover:text-red-500">Фильмы</NavLink>
          <NavLink to="/" className="block py-2 text-white hover:text-red-500">Поиск</NavLink>
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
