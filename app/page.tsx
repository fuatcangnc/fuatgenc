// app/page.tsx
import HomeSidebar from "@/components/shared/home-sidebar";
import WordPressLanding from "@/components/shared/home/hero-content";
import PaginationComponent from "@/components/shared/pagination";
import FAQAccordion from "@/components/shared/home/faq-accordion";
import PostCardContainer from "@/components/shared/post-card/post-card-container";
export default function Home() {
  return (
    <div className="container mx-auto p-4 max-w-7xl space-y-16">
      {/* <HeroCarousel items={carouselItems} /> */}
      <WordPressLanding />
      {/* Ana içerik alanı */}
      <div className="flex flex-col lg:flex-row lg:gap-x-16">
        <div className="lg:w-[70%]">
          <PostCardContainer/>
            <PaginationComponent currentPage={1} totalPages={5} />
            <FAQAccordion/>

        </div>
        <div className="lg:w-[30%] mt-8 lg:mt-0">
          <HomeSidebar />
        </div>
      </div>
    </div>
  );
}
