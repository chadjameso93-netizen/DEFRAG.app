import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "DEFRAG",
  description: "Relational intelligence platform",
  openGraph: {
    title: "DEFRAG",
    description: "Relational intelligence platform",
    url: "/",
    siteName: "DEFRAG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DEFRAG",
    description: "Relational intelligence platform",
  },
  applicationName: "DEFRAG",
}

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="antialiased" style={{ background: "#0A0A0A", color: "#F5F5F0" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen" style={{ background: "#0A0A0A", color: "#F5F5F0" }}>
        {children}
      </body>
    </html>
  )
}
