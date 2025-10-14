import { headers } from "next/headers";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/app/components/CartContext";
import intlConfig from "../next-intl.config";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function RootLayout({ children }) {
  const headerList = headers();
  const locale =
    headerList.get("x-next-intl-locale") ?? intlConfig.defaultLocale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="google-site-verification"
          content="cUEPQMEpnzfuv0q43Pi_nrUrtUH532hZ2xsO9hKboSE"
        />
        <meta
          name="norton-safeweb-site-verification"
          content="PHZR8PVVKOP45HOF1U7PXQLNRLN1U4KSDTRTZVAARMKJOON9X2-SPTYXH4TS81Z0KPDXIXBZBKWOIO6LC3O0DNK82NW0H5RK7H2GT55PGM11HJ0MWUWNXQVKXU90RNWD"
        />
        <meta name="robots" content="index, follow" />
      </head>
      <body className={`${playfair.variable} antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
