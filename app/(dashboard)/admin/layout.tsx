import { ThemeProvider } from "@/components/theme-provider"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Metadata, ResolvingMetadata } from 'next';
import ReactQueryProvider from '@/providers/ReactQueryProvider'

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Admin sayfaları için özel metadata
  const title = `Admin Panel - ${params.slug || 'Dashboard'}`;

  return {
    title,
    description: 'Admin panel sayfası',
    // Diğer metadata alanları...
  };
}

export default function AdminPanelLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ReactQueryProvider>
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
    </ReactQueryProvider>
  )
}