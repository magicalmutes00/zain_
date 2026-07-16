import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Language = "en" | "ar";

interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

const translations: Translations = {
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.about": { en: "About", ar: "عن الشركة" },
  "nav.services": { en: "Services", ar: "الخدمات" },
  "nav.products": { en: "Products", ar: "المنتجات" },
  "nav.industries": { en: "Industries", ar: "القطاعات" },
  "nav.projects": { en: "Projects", ar: "المشاريع" },
  "nav.contact": { en: "Contact", ar: "اتصل بنا" },
  "nav.getQuote": { en: "Get Quote", ar: "احصل على عرض سعر" },
  "hero.title": { en: "Fire Safety & Engineering Solutions", ar: "حلول السلامة من الحرائق والهندسة" },
  "hero.subtitle": { en: "Professional fire detection, protection, electrical, CCTV, and plumbing services across Oman.", ar: "خدمات كشف الحرائق والحماية الكهربائية وأمن الشبكات والسباكة في جميع أنحاء عمان." },
  "hero.cta": { en: "Get a Free Quote", ar: "احصل على عرض سعر مجاني" },
  "about.title": { en: "About Us", ar: "عن الشركة" },
  "services.title": { en: "Our Services", ar: "خدماتنا" },
  "contact.title": { en: "Contact Us", ar: "اتصل بنا" },
  "footer.quickLinks": { en: "Quick Links", ar: "روابط سريعة" },
  "footer.ourServices": { en: "Our Services", ar: "خدماتنا" },
  "footer.contactUs": { en: "Contact Us", ar: "اتصل بنا" },
  "footer.address": { en: "Address", ar: "العنوان" },
  "footer.phone": { en: "Phone", ar: "الهاتف" },
  "footer.email": { en: "Email", ar: "البريد الإلكتروني" },
  "footer.hours": { en: "Working Hours", ar: "ساعات العمل" },
  "cookie.message": { en: "We use cookies to improve your experience.", ar: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك." },
  "cookie.accept": { en: "Accept", ar: "قبول" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = useCallback(
    (key: string): string => {
      const translation = translations[key];
      if (!translation) {
        console.warn(`Translation missing for key: ${key}`);
        return key;
      }
      return translation[language] || translation.en;
    },
    [language]
  );

  const isRTL = language === "ar";

  useState(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  });

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? "rtl" : "ltr"} lang={language} className={isRTL ? "font-arabic" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 text-sm rounded ${language === "en" ? "bg-[#FF6B35] text-white" : "text-gray-600 hover:text-[#FF6B35]"}`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("ar")}
        className={`px-2 py-1 text-sm rounded ${language === "ar" ? "bg-[#FF6B35] text-white" : "text-gray-600 hover:text-[#FF6B35]"}`}
        aria-label="Switch to Arabic"
      >
        العربية
      </button>
    </div>
  );
}