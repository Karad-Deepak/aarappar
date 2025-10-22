"use client";
import { useState, useRef, useEffect, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

const SUPPORTED_LOCALES = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
];

export default function LanguageDropdown() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLocale = SUPPORTED_LOCALES.find((loc) => loc.code === locale) || SUPPORTED_LOCALES[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwitch = (targetLocale) => {
    if (targetLocale === locale) {
      setIsOpen(false);
      return;
    }

    startTransition(() => {
      const segments = pathname.split("/").filter(Boolean);
      if (segments.length === 0) {
        router.replace(`/${targetLocale}`);
      } else {
        segments[0] = targetLocale;
        const nextPath = `/${segments.join("/")}`;
        router.replace(nextPath);
      }
      setIsOpen(false);
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-1 px-3 py-1.5 text-slate-950 font-semibold text-lg hover:text-normalbg transition-colors duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{currentLocale.label}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
          {SUPPORTED_LOCALES.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => handleSwitch(code)}
              className={`w-full px-4 py-2.5 text-left font-medium transition-colors duration-200 ${
                code === locale ? "bg-rose-50 text-normalbg" : "text-slate-950 hover:bg-gray-50 hover:text-normalbg"
              }`}
              disabled={isPending}
            >
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}