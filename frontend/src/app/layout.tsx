import type { Metadata } from "next";
import '@mantine/core/styles.css';
import { createTheme, ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import "./globals.css";
import React from "react";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export const metadata: Metadata = {
  title: "Vial Health",
  description: "Take home assessment",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
