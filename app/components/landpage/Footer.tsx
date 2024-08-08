import { useTranslations } from "next-intl";

export function Footer() {
    const fullYear: number = new Date().getFullYear();
    const t = useTranslations('Footer');

    return (
        
        <footer className="mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
                <p className="text-xs text-center leading-5 text-gray-700">
                    &copy; {fullYear} {t('copyright')}
                </p>
            </div>
        </footer>
    );
}