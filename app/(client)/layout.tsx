import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar-client";
import { Metadata, ResolvingMetadata } from 'next';
import { getGeneralSettings } from '@/actions/general-settings.actions';

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const generalSettings = await getGeneralSettings();

  const siteTitle = generalSettings?.siteTitle || 'Fuat Genc';
  const description = generalSettings?.tagline || 'Bu bir client sayfasıdır';
  const siteIcon = generalSettings?.siteIcon;

  const title = params.slug ? `${siteTitle} - ${params.slug}` : siteTitle;

  return {
    title,
    description,
    icons: siteIcon ? [{ url: siteIcon }] : undefined,
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