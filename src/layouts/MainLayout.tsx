import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar/navbar";
import { LanguageProvider } from "../contexts/LanguageContext";
import { useLanguage } from "../contexts/LanguageContext";
import "./MainLayout.css";

const MaintainerBanner = () => {
  const { t } = useLanguage();
  return (
    <a
      href="https://franguh.plynte.com"
      className="maintainer-banner"
      target="_blank"
      rel="noopener noreferrer"
    >
      {t("banner.text")}
    </a>
  );
};

export const MainLayout = () => {
  return (
    <LanguageProvider>
      <MaintainerBanner />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </LanguageProvider>
  );
};
