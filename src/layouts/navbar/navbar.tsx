import { useEffect, useState } from "react";
import { NAV_ITEMS } from "./navbar.config";
import "./navbar.css";
import { LanguageSwitcher } from "../../components/UI/LanguageSwitcher/LanguageSwitcher";
import { useLanguage } from "../../contexts/LanguageContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle anchor links (#...) with smooth scroll
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.getElementById(href.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
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
        <ul className="navbar-menu">
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
        <a
          href="https://fran.plynte.com"
          className="navbar-maintainer"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("navbar.maintainer")}
        </a>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
