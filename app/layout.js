import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/app/components/CartContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "AARAPPAR INDISCHES RESTAURANT",
  description:
    "Modern dining with Indian flavours, easy reservations and custom catering in a sleek, stylish setting.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://aarappar.de/" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="google-site-verification"
          content="cUEPQMEpnzfuv0q43Pi_nrUrtUH532hZ2xsO9hKboSE"
        />
        <meta
          name="norton-safeweb-site-verification"
          content="PHZR8PVVKOP45HOF1U7PXQLNRLN1U4KSDTRTZVAARMKJOON9X2-SPTYXH4TS81Z0KPDXIXBZBKWOIO6LC3O0DNK82NW0H5RK7H2GT55PGM11HJ0MWUWNXQVKXU90RNWD"
        />
        <meta
          name="keywords"
          content="AARAPPAR, Indisches Restaurant, Indian Restaurant, Frankfurt, Rödelheim, Indian Cuisine, Curry, Biryani, Authentic Indian Food"
        />
        <meta name="robots" content="index, follow" />
      </head>
      <body className={` ${playfair.variable} antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
