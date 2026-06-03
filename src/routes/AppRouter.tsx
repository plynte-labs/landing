import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { lazy, Suspense } from "react";
import Loader from "../components/UI/Loader/Loader";
import ScrollToTop from "../components/UI/ScrollToTop/ScrollToTop";
import LandingPage from "../pages/LandingPage/LandingPage";

const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

const AppRouter = () => (
    <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<Loader message="Cargando..." />}>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </Suspense>
    </BrowserRouter>
);

export default AppRouter;
