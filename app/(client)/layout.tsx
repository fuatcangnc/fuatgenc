import { Metadata, ResolvingMetadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar-client";
import { getGeneralSettings } from "@/actions/general-settings.actions";
import { getGoogleForms } from "@/actions/api-ayarlari.actions";
import Script from "next/script";

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const generalSettings = await getGeneralSettings();

  const siteTitle = generalSettings?.siteTitle || "Fuat Genc";
  const description = generalSettings?.tagline || "Bu bir client sayfasıdır";
  const siteIcon = generalSettings?.siteIcon;

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
  // Google Forms verilerini getir
  const googleForms = await getGoogleForms();
  // İlk form kaydından Google Analytics ve Microsoft Clarity kodlarını al
  const googleAnalyticsCode = googleForms[0]?.googleAnalyticsCode;
  const microsoftClarityCode = googleForms[0]?.microsoftClarityCode;

  return (
    <>
      {microsoftClarityCode && (
        <Script
          id="microsoft-clarity"
          strategy="beforeInteractive"
        >
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${microsoftClarityCode}");
          `}
        </Script>
      )}
      <Navbar />
      {children}
      <Footer />
      {/* Google Analytics kodu varsa, GoogleAnalytics bileşenini ekle */}
      {googleAnalyticsCode && <GoogleAnalytics gaId={googleAnalyticsCode} />}
    </>
  );
}