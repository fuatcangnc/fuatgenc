"use client";
import * as React from "react";
import { ThemeProvider } from "next-themes";

type Props = {
  children?: React.ReactNode;
};

export function DarkTheme({children}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}