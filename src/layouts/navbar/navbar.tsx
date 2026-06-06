import { useCallback, useEffect, useState } from "react";
import { NAV_ITEMS } from "./navbar.config";
import "./navbar.css";
import { LanguageSwitcher } from "../../components/UI/LanguageSwitcher/LanguageSwitcher";
import { useLanguage } from "../../contexts/LanguageContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.getElementById(href.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} aria-label="Main navigation">
      <div className="navbar-left">
        <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="navbar-logo-link">
          <img
            className="navbar__logo"
            src="/Plynte.svg"
            alt="Plynte Labs"
            width="40"
            height="40"
          />
        </a>
      </div>

      <div className="navbar-right">
        <ul className={`navbar-menu ${menuOpen ? "navbar-menu--open" : ""}`}>
          {NAV_ITEMS.map((item, index) => {
            const displayLabel = item.translationKey ? t(item.translationKey) : item.label;
            return (
              <li key={index} className="navbar-item">
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {displayLabel}
                </a>
              </li>
            );
          })}
        </ul>
        <LanguageSwitcher />
        <button
          className={`navbar-hamburger ${menuOpen ? "navbar-hamburger--open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
