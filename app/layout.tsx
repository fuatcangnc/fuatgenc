import { Inter } from "next/font/google"
import "./globals.css"
import { Metadata } from 'next';
export const revalidate = 3600
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: 'Benim Sitem',
    template: '%s | Benim Sitem',
  },
  description: 'Benim harika sitem hakkında genel açıklama',
  // Diğer genel metadata alanları...
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}