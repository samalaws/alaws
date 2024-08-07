import { useTranslations } from "next-intl";

export default function LandpageDev() {
    const t = useTranslations('DevPage');
    return (
        <>
            <div className="pl-4 mb-10">
                <h1 className="text-3xl font-bold text-gray-700">{t('title')}</h1>
                <h3 className="text-gray-500">{t('description')}</h3>
            </div>
        </>
    );
}