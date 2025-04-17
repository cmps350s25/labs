import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "Country Facts",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        // ${sans.className}
        className={`mx-auto min-w-[500px] max-w-3xl pt-1 pb-6 px-6 text-neutral-900 bg-neutral-50 dark:text-neutral-50 dark:bg-neutral-900`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
