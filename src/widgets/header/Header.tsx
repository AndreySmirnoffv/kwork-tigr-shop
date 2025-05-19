import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import s from "./Header.module.scss";
import { AuthModal } from "../../shared/lib/authModal/ui/AuthModal";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const buttonsData = [
    {
      id: 1,
      image: "/search.png",
      path: "/search",
      alt: "Поиск",
      action: () => {
        navigate("/search");
      },
    },
    {
      id: 2,
      image: "/account.png",
      path: "/account",
      alt: "Аккаунт",
      action: async () => {
        try {
          const res = await fetch("http://localhost:8000/api/auth/check-tokens", {
            method: "GET",
            credentials: "include",
          });

          if (!res.ok) {
            setShowAuthModal(true);
            return;
          }

          navigate("/profile");
        } catch (error) {
          console.error(error);
          setShowAuthModal(true);
        }
      },
    },
    {
      id: 3,
      image: "/basket.png",
      path: "/basket",
      alt: "Корзина",
      action: () => {
        navigate("/basket");
      },
    },
  ];

  const handleButtonClick = (buttonId: number, action: () => void) => {
    setActiveButton(buttonId);
    action();
  };

  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <section className={s.logo}>
          <Link to="/">
            <img src="/ts.png" alt="Логотип" />
          </Link>
        </section>

        <ul className={s.main}>
          <li><Link to="/">sale</Link></li>
          <li><Link to="/shoes">обувь</Link></li>
          <li><Link to="/products">одежда</Link></li>
          <li><Link to="/payments">аксессуары</Link></li>
          <li><Link to="/">коллекции</Link></li>
          <li><Link to="/">другое</Link></li>
          <li><Link to="/">бренды</Link></li>
          <li><Link to="/">информация</Link></li>
        </ul>

        <section className={s.buttons}>
          {buttonsData.map((button) => (
            <Link
              to="#"
              key={button.id}
              className={`
                ${s.button}
                ${activeButton === button.id ? s.active : ""}
                ${(button.id === 1 || button.id === 2) ? s.hideOnMobile : ""}
              `}
              onClick={(e) => {
                e.preventDefault();
                handleButtonClick(button.id, button.action);
              }}
            >
              <img
                src={button.image}
                alt={button.alt}
                className={s.icon}
              />
            </Link>
          ))}

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

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </header>
  );
}
