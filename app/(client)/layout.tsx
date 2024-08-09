import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar-client";
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Eğer gerekiyorsa, burada bir API çağrısı yapabilir veya
  // veritabanından veri çekebilirsiniz
  const title = `Client Sayfası - ${params.slug || 'Ana Sayfa'}`;

  return {
    title,
    description: 'Bu bir client sayfasıdır',
    // Diğer metadata alanları...
  };
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer/>
    </>
  )
}