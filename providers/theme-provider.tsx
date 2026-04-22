"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

// "use client";

// import { ThemeProvider } from "next-themes";
// import type { ReactNode } from "react";

// type ProvidersProps = {
//   children: ReactNode;
// };

// export function Providers({ children }: ProvidersProps) {
//   return (
//     <ThemeProvider
//       attribute="class"
//       defaultTheme="system"
//       enableSystem
//       disableTransitionOnChange
//     >
//       {children}
//     </ThemeProvider>
//   );
// }