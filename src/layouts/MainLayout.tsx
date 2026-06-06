import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar/navbar";
import { LanguageProvider } from "../contexts/LanguageContext";
import { MaintainerBanner } from "./banner/MaintainerBanner";
import "./MainLayout.css";

export const MainLayout = () => {
  return (
    <LanguageProvider>
      <MaintainerBanner />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
    </LanguageProvider>
  );
};
