"use client";

import NextLink from "next/link";
import { useLocale } from "next-intl";
import intlConfig from "@/next-intl.config";

const EXTERNAL_PATTERN = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

function localizeHref(href, locale) {
  if (typeof href !== "string") {
    return href;
  }

  if (href === "#") {
    return href;
  }

  if (EXTERNAL_PATTERN.test(href) || href.startsWith("#")) {
    return href;
  }

  if (!href.startsWith("/")) {
    return `/${locale}/${href}`;
  }

  if (href === "/") {
    return `/${locale}`;
  }

  return `/${locale}${href}`;
}

export default function LocalizedLink({ href, locale: overrideLocale, ...props }) {
  const activeLocale = overrideLocale ?? useLocale();
  const locale = overrideLocale ?? activeLocale ?? intlConfig.defaultLocale;
  const localizedHref = localizeHref(href, locale);

  return <NextLink href={localizedHref} {...props} />;
}
