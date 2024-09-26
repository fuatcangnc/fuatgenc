// components/posts/post-1.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { WhatsappLogo, FacebookLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import Breadcrumb from "@/components/shared/breadcrumb";
import {
  ChatCircleText,
  DeviceMobileCamera,
  BatteryCharging,
  Cpu,
  Calendar,
} from "@phosphor-icons/react/dist/ssr";
import SocialShare from "@/components/shared/single-post/social-share";
import PostFooter from "./post-footer";
function Post1() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Phones", href: "/phones" },
    {
      label: "Tecno Spark 10 Launched With Up To 16GB RAM, 32MP Selfie Camera",
      href: "#",
    },
  ];

  return (
    <article className="single-post">
      <div className="single-post-meta">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-3xl font-bold">
          Tecno Spark 10 Launched With Up To 16GB RAM, 32MP Selfie Camera
        </h1>
        <p className="text-gray-600">
          Tecno has unveiled its latest smartphone, the Spark 10, featuring
          impressive specifications including up to 16GB of RAM and a
          high-resolution 32MP selfie camera.
        </p>
        <time
          className="text-sm text-gray-500 block"
          dateTime="2024-08-07T10:38:00"
        >
          Published: August 7, 2024 - 10:38 AM
        </time>
      <SocialShare /> {/* Add the SocialShare component here */}

      </div>
      <div className="single-post-content">
      <Image
        src="/post-1.jpeg"
        alt="Tecno Spark 10"
        width={800}
        height={450}
        className="w-full h-[476px] mb-6 object-cover"
      />
      <h2>Key Features</h2>
      <ul>
        <li className="flex items-center mb-2">
          <ChatCircleText className="w-5 h-5 mr-2 text-green-500" />
          <strong>RAM:</strong> Up to 16GB (8GB physical + 8GB virtual)
        </li>
        <li className="flex items-center mb-2">
          <DeviceMobileCamera className="w-5 h-5 mr-2 text-blue-500" />
          <strong>Selfie Camera:</strong> 32MP front-facing camera
        </li>
        <li className="flex items-center mb-2">
          <BatteryCharging className="w-5 h-5 mr-2 text-yellow-500" />
          <strong>Display:</strong> 6.6-inch IPS LCD with 90Hz refresh rate
        </li>
        <li className="flex items-center mb-2">
          <Cpu className="w-5 h-5 mr-2 text-red-500" />
          <strong>Processor:</strong> MediaTek Helio G88
        </li>
        <li className="flex items-center mb-2">
          <BatteryCharging className="w-5 h-5 mr-2 text-green-500" />
          <strong>Battery:</strong> 5,000mAh with 18W fast charging
        </li>
        <li className="flex items-center mb-2">
          <Calendar className="w-5 h-5 mr-2 text-purple-500" />
          <strong>Operating System:</strong> HiOS 12.6 based on Android 13
        </li>
      </ul>
      <blockquote className="p-4 italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-500 quote">
        "The standout feature of the Tecno Spark 10 is undoubtedly its RAM
        capacity. With up to 16GB of RAM (8GB physical + 8GB virtual), the
        device promises smooth multitasking and improved app performance,
        rivaling even some mid-range and high-end smartphones in this aspect."
      </blockquote>
      <p>
        Photography enthusiasts will appreciate the 32MP front-facing camera,
        which is designed to capture stunning selfies and support high-quality
        video calls. The main camera setup, while not explicitly mentioned in
        the launch, is expected to be competitive for its price range.
      </p>
      <p>
        The 6.6-inch IPS LCD display with a 90Hz refresh rate ensures a smooth
        and responsive user experience, whether you're scrolling through social
        media or playing games. The MediaTek Helio G88 processor should provide
        adequate performance for daily tasks and light gaming.
      </p>
      <p>
        With a large 5,000mAh battery and 18W fast charging support, the Spark
        10 is well-equipped to last through a full day of use and beyond. The
        inclusion of HiOS 12.6, based on Android 13, brings the latest software
        features and security updates to the device.
      </p>
      <h2>Availability and Pricing</h2>
      <p>
        The Tecno Spark 10 is expected to be available in select markets
        starting next week. While official pricing has not been announced,
        industry insiders speculate that it will be competitively priced in the
        budget to lower mid-range segment, making it an attractive option for
        consumers seeking high-end features at an affordable price point.
      </p>
      <p>
        As Tecno continues to expand its presence in the global smartphone
        market, the Spark 10 represents another step forward in the company's
        mission to deliver feature-rich devices at accessible price points. It
        will be interesting to see how this new model performs against
        established competitors in its category.
      </p>
      <div className="flex space-x-4 mt-6 lg:hidden">
        <Link
          href="#"
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md"
        >
          <WhatsappLogo weight="fill" className="w-5 h-5 mr-2 text-green-500" />
          <span className="text-sm font-semibold">Share</span>
        </Link>
        <Link
          href="#"
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md"
        >
          <FacebookLogo weight="fill" className="w-5 h-5 mr-2 text-blue-600" />
          <span className="text-sm font-semibold">Share</span>
        </Link>
        <Link
          href="#"
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md"
        >
          <XLogo weight="fill" className="w-5 h-5 mr-2 text-black" />
          <span className="text-sm font-semibold">Share</span>
        </Link>
      </div>
      </div>
      <div className="single-post-footer">
        <PostFooter/>
      </div>
    </article>
  );
}

export default Post1;
