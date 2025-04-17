// import React from "react";
import "./globals.css";

export const metadata = {
  title: "Project Tracker",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased p-5">{children}</body>
    </html>
  );
}
