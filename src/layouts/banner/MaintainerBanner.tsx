import { useLanguage } from "../../contexts/LanguageContext";
import "../MainLayout.css";

export const MaintainerBanner = () => {
  const { t } = useLanguage();
  return (
    <a
      href="https://franguh.plynte.com"
      className="maintainer-banner"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Maintainer portfolio (opens in new tab)"
    >
      {t("banner.text")}
    </a>
  );
};
