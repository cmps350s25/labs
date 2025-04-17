// import React from "react";
import "./globals.css";

export const metadata = {
  title: "Project Tracker",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased p-5 max-w-[600px] min-w-[320px] mx-auto">
        <header></header>
        {children}
        <footer></footer>
      </body>
    </html>
  );
}
