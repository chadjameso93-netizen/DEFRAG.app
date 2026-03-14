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
  themeColor: "#09090b",
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
    <html lang="en" className="bg-zinc-950 text-zinc-50 antialiased">
      <body className="min-h-screen bg-zinc-950 text-zinc-50">
        {children}
      </body>
    </html>
  )
}
