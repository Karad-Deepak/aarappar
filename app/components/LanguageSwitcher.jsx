"use client";
import { useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const SUPPORTED_LOCALES = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSwitch = (targetLocale) => {
    if (targetLocale === locale) {
      return;
    }

    startTransition(() => {
      const segments = pathname.split("/").filter(Boolean);
      if (segments.length === 0) {
        router.replace(`/${targetLocale}`);
        return;
      }

      segments[0] = targetLocale;
      const nextPath = `/${segments.join("/")}`;
      router.replace(nextPath);
    });
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-normalbg/30 bg-white/70 px-1 py-0.5 text-xs font-semibold uppercase shadow-sm">
      {SUPPORTED_LOCALES.map(({ code, label }) => {
        const isActive = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => handleSwitch(code)}
            disabled={isPending}
            className={`px-2 py-1 rounded-full transition-colors ${
              isActive
                ? "bg-normalbg text-white"
                : "text-normalbg hover:bg-normalbg/10"
            }`}
            aria-pressed={isActive}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
