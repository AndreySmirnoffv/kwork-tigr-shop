import { useState } from "react";
import { Link } from "react-router-dom";
import s from "./Header.module.scss";


export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <section className={s.logo}>LOGO</section>

        <section className={s.main}>
          <Link to="/">sale</Link>
          <Link to="/login">обувь</Link>
          <Link to="/products">одежда</Link>
          <Link to="/payments">аксессуары</Link>
          <Link to="/profile">коллекции</Link>
          <Link to="/profile">другое</Link>
          <Link to="/profile">бренды</Link>
          <Link to="/profile">информация</Link>
        </section>

        <section className={s.buttons}>
          <div
            className={`${s.burger} ${menuOpen ? s.open : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        </section>
      </nav>

      <div className={`${s.mobileMenu} ${menuOpen ? s.open : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>sale</Link>
        <Link to="/login" onClick={() => setMenuOpen(false)}>обувь</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}>одежда</Link>
        <Link to="/payments" onClick={() => setMenuOpen(false)}>аксессуары</Link>
        <Link to="/profile" onClick={() => setMenuOpen(false)}>коллекции</Link>
        <Link to="/profile" onClick={() => setMenuOpen(false)}>другое</Link>
        <Link to="/profile" onClick={() => setMenuOpen(false)}>бренды</Link>
        <Link to="/profile" onClick={() => setMenuOpen(false)}>информация</Link>
      </div>
    </header>
  );
}
