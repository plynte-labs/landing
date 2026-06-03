import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import "./NotFoundPage.css";
import { SEOHead } from "../../components/SEOHead";
import { useLanguage } from "../../contexts/LanguageContext";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="Page404">
      <SEOHead title={`404 - ${t("notFound.title")}`} description={t("notFound.description")} />

      <div className="Page404__content">
        <h1 className="Page404__code">404</h1>
        <h2>{t("notFound.title")}</h2>
        <p>{t("notFound.description")}</p>

        <div className="Page404__buttons">
          <Button variant="primary" onClick={() => navigate("/")}>
            {t("hero.cta")}
          </Button>
          <a
            href="https://github.com/plynte-labs"
            target="_blank"
            rel="noopener noreferrer"
            className="button button--secondary"
          >
            {t("notFound.btnGithub")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
