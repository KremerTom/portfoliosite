import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import { Work_Sans, Poiret_One } from 'next/font/google';
import '@mantine/core/styles.css';
import "./globals.css";

const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
});

const poiretOne = Poiret_One({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

export const metadata: Metadata = {
  title: "Tom Kremer's personal site",
  description: "Developer building fullstack web apps with machine learning capabilities",
};

/**
 * MANTINE THEMING GUIDE
 * ====================
 *
 * This theme defines design tokens that can be used throughout the app.
 *
 * HOW TO USE THEME COLORS:
 *
 * 1. Direct color props (recommended):
 *    <Box bg="warmBeige.1">           // background
 *    <Text c="warmBeige.9">           // color (text)
 *    <Button color="accent">          // using primaryColor
 *
 * 2. CSS variables in style prop:
 *    style={{ color: 'var(--mantine-color-warmBeige-9)' }}
 *
 * 3. Theme hook in components:
 *    const theme = useMantineTheme();
 *    style={{ color: theme.colors.warmBeige[9] }}
 *
 * COLOR PALETTE:
 * - warmBeige[0-9]: Warm peach/beige tones (backgrounds, cards)
 * - accent: Blue accent color for CTAs
 * - text: Black/gray for typography
 *
 * SPACING (use these instead of hardcoded px):
 * - spacing: xs, sm, md, lg, xl
 * - Example: <Stack gap="xl"> or p="md"
 *
 * RESPONSIVE (breakpoints):
 * - base (mobile), xs, sm, md, lg, xl
 * - Example: size={{ base: 32, md: 64 }}
 */

const theme = createTheme({
  colors: {
    // Custom warm beige palette - index usage:
    // 0-1: lightest backgrounds
    // 2-5: mid-tones
    // 6-8: darker accents
    // 9: darkest (text/borders)
    warmBeige: [
      '#FAF6F0',  // 0: card background
      '#F4EAE0',  // 1: page background
      '#F4DFC8',  // 2: hover states
      '#e5cfb8',  // 3
      '#d6bfa8',  // 4
      '#c7af98',  // 5
      '#b89f88',  // 6: secondary text
      '#a98f78',  // 7
      '#666666',  // 8: secondary text
      '#000000',  // 9: primary text/borders
    ],
    accent: [
      '#E8F4F8',
      '#D1E9F1',
      '#B9DEEA',
      '#A2D3E3',
      '#8AC8DC',
      '#73BDD5',
      '#5BB2CE',
      '#4A7C9E',  // 7: primary CTA color
      '#3A6380',
      '#2A4A62',
    ],
    text: [
      '#F5F5F5',
      '#E5E5E5',
      '#D4D4D4',
      '#A3A3A3',
      '#737373',
      '#525252',
      '#404040',
      '#262626',
      '#171717',
      '#000000',  // 9: primary text
    ],
  },
  primaryColor: 'accent',
  defaultRadius: 'md',
  fontFamily: workSans.style.fontFamily,
  headings: {
    fontFamily: poiretOne.style.fontFamily,
    fontWeight: '400',
  },
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  breakpoints: {
    xs: '36em',  // 576px
    sm: '48em',  // 768px
    md: '62em',  // 992px
    lg: '75em',  // 1200px
    xl: '88em',  // 1408px
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
