import "./globals.css";

export const metadata = {
  title: "Project Tracker",
  description: "Application for tracking projects with multiple tasks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="p-5 antialiased">{children}</body>
    </html>
  );
}
