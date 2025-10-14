import { getRequestConfig } from "next-intl/server";
import intlConfig from "../next-intl.config";

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = intlConfig.locales.includes(locale)
    ? locale
    : intlConfig.defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  };
});
