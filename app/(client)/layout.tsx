import { Metadata, ResolvingMetadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar-client";
import Script from "next/script";

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};

const API_URL = process.env.SITE_URL;

async function getGeneralSettings() {
  const response = await fetch(`${API_URL}/settings`);
  if (!response.ok) {
    console.error('Failed to fetch general settings');
    return null;
  }
  return response.json();
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const generalSettings = await getGeneralSettings();

  const siteTitle = generalSettings?.title || "Fuatcan Genc";
  const description = generalSettings?.description || "Bu bir client sayfasıdır";
  const siteIcon = generalSettings?.site_icon_url;

  const title = params.slug ? `${siteTitle} - ${params.slug}` : siteTitle;

  return {
    title,
    description,
    icons: siteIcon ? [{ url: siteIcon }] : undefined,
  };
}

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const generalSettings = await getGeneralSettings();
  const googleAnalyticsId = generalSettings?.google_analytics_id;
  const microsoftClarityId = generalSettings?.microsoft_clarity_id;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      {googleAnalyticsId && <GoogleAnalytics gaId={googleAnalyticsId} />}
      {microsoftClarityId && (
        <Script id="microsoft-clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${microsoftClarityId}");
          `}
        </Script>
      )}
    </>
  );
}