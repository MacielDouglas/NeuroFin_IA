import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClerkThemeProvider from "@/components/ClerkThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ExpenseTracker AI - Smart Financial Management",
  description:
    "AI-powered expense tracking app with intelligent insights, smart categorization, and personalized financial recommendations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-200 transition-colors duration-300`}
      >
        <ThemeProvider>
          <ClerkThemeProvider>
            <Navbar />
            {children}
            <Footer />
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import Navbar from "@/components/Navbar";
// import { ThemeProvider } from "@/contexts/ThemeContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="pt-BR">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-200 transition-colors duration-300`}
//       >
//         <ThemeProvider>
//           <ClerkProvider>
//             <Navbar />
//             {children}
//           </ClerkProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
