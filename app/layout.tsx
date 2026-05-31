import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./components/AuthProvider";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import FAQBot from "./components/FAQBot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Subspace — One Place for All Your Subscriptions",
  description:
    "Track, split, and save on every subscription. The smartest way to manage your digital life. Join 50K+ users saving money with Subspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} antialiased`}>
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
          transition: "background 0.3s, color 0.3s"
        }}
      >
        <LanguageProvider>
          <AuthProvider>
            <ThemeProvider>
              {children}
              <FAQBot />
            </ThemeProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
