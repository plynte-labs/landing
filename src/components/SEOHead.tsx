// src/components/SEOHead.tsx
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

export const SEOHead = ({ title, description, image, url }: SEOProps) => {
    const { language, t } = useLanguage();

    const displayTitle = title || t("seo.title");
    const displayDescription = description || t("seo.description");

    return (
        <Helmet>
            <html lang={language} />
            <title>{`${displayTitle} | Plynte Labs`}</title>
            <meta name="description" content={displayDescription} />
            <meta property="og:title" content={displayTitle} />
            <meta property="og:description" content={displayDescription} />
            <meta property="og:image" content={image || '/plynte logo2.png'} />
            <meta property="og:url" content={url || 'https://plynte.com'} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <link rel="canonical" href={url || 'https://plynte.com'} />
        </Helmet>
    );
};
