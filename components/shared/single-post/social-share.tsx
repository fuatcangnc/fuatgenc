"use client"
import React from 'react';
import { 
  FacebookLogo, 
  XLogo, 
  PinterestLogo, 
  LinkSimple, 
  ShareNetwork, 
  FloppyDisk 
} from "@phosphor-icons/react";
import Link from 'next/link';

function SocialShare() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button className="flex items-center text-gray-500 hover:text-black mr-4">
          <ShareNetwork className="w-5 h-5 mr-1" />
          <span className='text-[13px] text-[#444] font-medium'>Paylaş</span>
        </button>
        <ul className="flex items-center space-x-4">
          <li>
            <Link href="#" title="Facebook'ta paylaş" className="text-[#1D78E9] hover:text-blue-600">
              <FacebookLogo weight='fill' className="w-5 h-5" />
            </Link>
          </li>
          <li>
            <Link href="#" title="X'de paylaş" className="text-[#55acef] hover:text-black">
              <XLogo  className="w-5 h-5" />
            </Link>
          </li>
          <li>
            <Link href="#" title="Pinterest'te paylaş" className="text-[#FB2544] hover:text-red-600">
              <PinterestLogo weight='fill' className="w-5 h-5" />
            </Link>
          </li>
          <li>
            <Link href="#" title="Linki kopyala" className="text- hover:text-black">
              <LinkSimple className="w-5 h-5" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-2 border-[#e8e8e8] border px-6 min-h-[40px] rounded-sm">
        <span className='text-[13px] text-[#444] font-medium'>Takip edin</span>
        <ul className="flex items-center space-x-3">
          <li >
            <Link href="#" title="Google'da takip et" className="text-gray-500 hover:text-blue-600">
              <NewsIcon/>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SocialShare;
function NewsIcon() {
    return (
        <svg
    className="icon-svg icon-google-news w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
  >
    <g clipPath="url(#a)">
      <path
        fill="#0C9D58"
        d="M19.09 15.32a.612.612 0 0 1-.611.608H5.52a.612.612 0 0 1-.612-.608V2.608c0-.334.275-.608.612-.608h12.96c.337 0 .612.274.612.608V15.32Z"
      />
      <path
        fill="#004D40"
        d="m19.09 5.268-4.855-.625 4.856 1.303v-.678Zm-6.856-2.605L4.88 5.947l8.128-2.959V2.98c-.143-.306-.491-.45-.774-.317Z"
        opacity={0.2}
      />
      <path
        fill="#fff"
        d="M18.479 2H5.52a.612.612 0 0 0-.612.608v.136c0-.334.275-.608.612-.608h12.96c.337 0 .612.274.612.608v-.136A.612.612 0 0 0 18.479 2Z"
        opacity={0.2}
      />
      <path
        fill="#EA4335"
        d="M8.053 14.93c-.087.326.088.659.389.74l12.001 3.227c.301.08.62-.12.707-.447L23.977 7.9c.087-.327-.087-.66-.388-.74L11.587 3.93c-.301-.08-.62.12-.706.447L8.053 14.93Z"
      />
      <path
        fill="#3E2723"
        d="m21.273 11.665.631 3.835-.631 2.357v-6.192ZM14.291 4.8l.566.151.35 2.367-.916-2.519Z"
        opacity={0.2}
      />
      <path
        fill="#fff"
        d="M23.589 7.159 11.588 3.93c-.302-.08-.62.12-.707.447L8.054 14.93c-.005.017-.006.035-.01.053L10.852 4.51c.087-.326.405-.527.706-.447l12.001 3.228c.285.076.454.378.398.687l.022-.08c.087-.327-.088-.66-.39-.74Z"
        opacity={0.2}
      />
      <path
        fill="#FFC107"
        d="M17.505 13.63c.116.318-.03.665-.322.771l-12.664 4.61c-.293.106-.627-.066-.743-.384L.04 8.362c-.115-.318.03-.665.322-.771l12.665-4.61c.293-.106.627.066.742.384l3.736 10.265Z"
      />
      <path
        fill="#fff"
        d="M.088 8.491c-.115-.317.03-.664.322-.77l12.665-4.61c.29-.106.619.062.738.373l-.044-.12c-.116-.317-.45-.49-.742-.383L.362 7.591c-.293.106-.438.453-.322.771l3.736 10.265.005.01L.088 8.49Z"
        opacity={0.2}
      />
      <path
        fill="#4285F4"
        d="M21.273 21.023a.616.616 0 0 1-.614.613H3.341a.616.616 0 0 1-.614-.613V7.932c0-.338.276-.614.614-.614h17.318c.338 0 .614.276.614.614v13.09Z"
      />
      <path
        fill="#fff"
        d="M17.966 12.5h-5.182v-1.364h5.182c.15 0 .272.123.272.273v.818c0 .15-.122.273-.272.273Zm0 5.182h-5.182v-1.364h5.182c.15 0 .272.122.272.273v.818c0 .15-.122.273-.272.273Zm.818-2.591h-6v-1.364h6c.15 0 .273.122.273.273v.818a.273.273 0 0 1-.273.273Z"
      />
      <path
        fill="#1A237E"
        d="M20.66 21.5H3.34a.616.616 0 0 1-.613-.614v.137c0 .337.276.613.614.613h17.318a.616.616 0 0 0 .614-.613v-.137a.616.616 0 0 1-.614.614Z"
        opacity={0.2}
      />
      <path
        fill="#fff"
        d="M3.34 7.454h17.32c.337 0 .613.277.613.614v-.136a.616.616 0 0 0-.614-.614H3.341a.616.616 0 0 0-.614.614v.136c0-.337.276-.614.614-.614Z"
        opacity={0.2}
      />
      <path
        fill="#fff"
        d="M8.148 13.864v1.23h1.764c-.145.749-.804 1.292-1.764 1.292-1.072 0-1.94-.906-1.94-1.977 0-1.071.868-1.977 1.94-1.977.482 0 .914.165 1.255.49v.001l.934-.934a3.142 3.142 0 0 0-2.19-.853 3.273 3.273 0 0 0 0 6.546c1.89 0 3.134-1.329 3.134-3.198 0-.215-.02-.421-.052-.62H8.148Z"
      />
      <g fill="#1A237E" opacity={0.2}>
        <path d="M8.182 15.094v.136h1.732c.012-.045.023-.09.033-.136H8.182Z" />
        <path d="M8.182 17.682a3.272 3.272 0 0 1-3.271-3.205l-.002.068a3.273 3.273 0 0 0 3.273 3.273c1.89 0 3.133-1.329 3.133-3.199l-.002-.043c-.04 1.82-1.272 3.106-3.131 3.106Zm1.255-4.76a1.78 1.78 0 0 0-1.255-.49c-1.072 0-1.94.906-1.94 1.977 0 .023.002.045.003.068.036-1.041.888-1.91 1.937-1.91.482 0 .914.167 1.255.492l1.002-1.002c-.023-.021-.05-.04-.073-.062l-.928.928Z" />
      </g>
      <path
        fill="#1A237E"
        d="M18.238 12.363v-.136c0 .15-.122.273-.272.273h-5.182v.136h5.182c.15 0 .272-.122.272-.273Zm-.272 5.319h-5.182v.136h5.182c.15 0 .272-.122.272-.273v-.136c0 .15-.122.273-.272.273Zm.818-2.591h-6v.136h6c.15 0 .273-.122.273-.273v-.136c0 .15-.122.273-.273.273Z"
        opacity={0.2}
      />
      <path
        fill="url(#b)"
        d="m23.589 7.159-4.498-1.21V2.608A.612.612 0 0 0 18.479 2H5.52a.612.612 0 0 0-.612.608v3.328L.362 7.59c-.293.106-.438.453-.322.771l2.687 7.384v5.277c0 .337.276.613.614.613h17.318a.616.616 0 0 0 .614-.613v-3.03l2.705-10.094c.087-.327-.088-.66-.39-.74Z"
      />
    </g>
    <defs>
      <radialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="translate(5.41 3.59) scale(23.3397)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.1} />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </radialGradient>
      <clipPath id="a">
        <path fill="#fff" d="M0 2h24v19.636H0z" />
      </clipPath>
    </defs>
  </svg>
      
    );
  }
  
