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
        <meta
          name="google-site-verification"
          content="cUEPQMEpnzfuv0q43Pi_nrUrtUH532hZ2xsO9hKboSE"
        />
      </head>
      <body className={`${raleway.variable} antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
