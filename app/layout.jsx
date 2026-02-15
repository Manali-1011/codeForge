import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "CODEFORGE",
  description: "CodeForge – Practice. Solve. Level Up.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.className} dark`}>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
