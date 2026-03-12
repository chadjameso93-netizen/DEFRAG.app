import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Defrag",
  description: "Relational intelligence platform",
  applicationName: "Defrag",
  manifest: "/manifest.json"
}

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-[#09090b] text-white">
      <body className="min-h-screen bg-[#09090b] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
