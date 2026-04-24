import type { Metadata } from "next";
import type { ReactNode } from "react";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants/app";
import { AppProvider } from "@/providers/app-provider";
import "./globals.css";
import { Toaster } from "sonner";




export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s — ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppProvider>{children}
                  <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            duration: 3000,
          }}
        />
        </AppProvider>
      </body>
    </html>
  );
}