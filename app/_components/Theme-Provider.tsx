"use client";
// codigo alterado para faze-lo funcionar esta difernete da documentação
import { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // Renderiza sem tema enquanto o cliente monta
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
