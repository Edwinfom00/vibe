import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "sonner";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vibe",
    template: "%s | Vibe",
  },
  description:
    "Vibe is an AI-powered code generation sandbox that lets you build, edit, and run applications from simple prompts in a secure environment.",
  keywords: [
    "AI code generation",
    "sandbox",
    "developer tools",
    "Next.js",
    "AI app builder",
    "code interpreter",
  ],
  authors: [{ name: "Edwin Fom" }],
  creator: "Edwin Fom",
  metadataBase: new URL("https://vibe-alpha-sooty.vercel.app"), 

  openGraph: {
    title: "Vibe",
    description:
      "Generate, edit and run code using AI in a secure sandbox environment.",
    url: "https://vibe.dev",
    siteName: "Vibe",
    images: [
      {
        url: "/vibe.png", // ton image README
        width: 1200,
        height: 630,
        alt: "Vibe Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Vibe",
    description:
      "AI-powered code generation sandbox for building apps from prompts.",
    images: ["/vibe.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#c96342",
        }
      }}
    >
      <TRPCReactProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ThemeProvider
              attribute={"class"}
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster richColors />
            </ThemeProvider>
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
