import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import { Work_Sans, Cormorant_Garamond } from 'next/font/google';
import '@mantine/core/styles.css';
import "./globals.css";

const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: "Tom Kremer - Portfolio",
  description: "Developer & Builder - Portfolio and Projects",
};

const theme = createTheme({
  colors: {
    dark: [
      '#FAF6F0',
      '#F4EAE0',
      '#F4DFC8',
      '#e5cfb8',
      '#d6bfa8',
      '#c7af98',
      '#b89f88',
      '#a98f78',
      '#1a1a1a',
      '#000000',
    ],
  },
  primaryColor: 'dark',
  defaultRadius: 'md',
  fontFamily: workSans.style.fontFamily,
  headings: {
    fontFamily: cormorantGaramond.style.fontFamily,
    fontWeight: '700',
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-mantine-color-scheme="light">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body className={workSans.className}>
        <MantineProvider theme={theme} defaultColorScheme="light">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
