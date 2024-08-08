import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AdminLayout } from "@/components/admin/admin-layout"

const inter = Inter({ subsets: ["latin"] })

export default function AdminPanelLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AdminLayout>
            {children}
          </AdminLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}