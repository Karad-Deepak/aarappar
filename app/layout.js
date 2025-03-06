import { Raleway } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/app/components/CartContext";
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
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
        {/* Link to the web app manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Define the theme color for the browser */}
        <meta name="theme-color" content="#317EFB" />
        {/* Apple-specific meta tags */}
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${raleway.variable} antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
