import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import {
  unstable_setRequestLocale,
  getTranslations,
} from "next-intl/server";
import FloatingLanguageSwitcher from "@/app/components/FloatingLanguageSwitcher";
import intlConfig from "../../../next-intl.config";

const siteUrl = "https://aarappar.de";

export function generateStaticParams() {
  return intlConfig.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }) {
  if (!intlConfig.locales.includes(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const { locales, defaultLocale } = intlConfig;
  const canonical =
    locale === defaultLocale ? siteUrl : `${siteUrl}/${locale}`;
  const languages = Object.fromEntries(
    locales.map((code) => [
      code,
      code === defaultLocale ? siteUrl : `${siteUrl}/${code}`,
    ])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages,
    },
  };
}

export default async function LocaleLayout({ children, params: { locale } }) {
  if (!intlConfig.locales.includes(locale)) {
    notFound();
  }

  unstable_setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
      <FloatingLanguageSwitcher />
    </NextIntlClientProvider>
  );
}
