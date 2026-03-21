import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bogtor",
  description: "Food & Travel App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        {/* ฟอนต์ Sarabun */}
        <link
          href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          margin: 0,
          fontFamily: "'Sarabun', sans-serif",
          backgroundColor: "#f1f2f6",
        }}
      >
        {children}
      </body>
    </html>
  );
}