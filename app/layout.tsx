import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/shared/navbar-client";

const inter = Inter({ subsets: ["latin"] })

export default  function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} relative`}>
      <Navbar/>

      {children}
      {/* <Footer/> */}
      </body>
    </html>
  )
}