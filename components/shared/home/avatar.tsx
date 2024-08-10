'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function Avatar() {
  return (
    <Card className="border p-4">
      <CardContent className='flex flex-col items-center gap-3'>
        <div className="flex justify-center items-center mb-4">
          <Image
            src="/avatar.avif"
            alt="Fuat Genc avatar"
            width={100}
            height={100}
            className="rounded-full border-2 border-[#05C898]"
          />
        </div>
        <div className="text-lg text-center font-medium text-gray-950 flex items-center">
          <span className="inline-block w-2 h-2 bg-red-600 mr-2"></span>
          Fuat Genc Hakkında
        </div>
        <p className="text-[13px] text-gray-600 text-center">
        Web sitenizin hem kullanıcı dostu hem de arama motorları için optimize edilmiş olması gerektiğine inanıyorum. Uzmanlık alanım, sitenizi Google gibi arama motorlarında üst sıralara taşıyarak, daha fazla ziyaretçi ve potansiyel müşteri kazanmanızı sağlamaktır. WordPress ile site kurulumundan SEO stratejilerine kadar her aşamada size profesyonel destek sunuyorum. 
        </p>
        <Link 
  href={'https://x.com/fuatseo'} 
  className="text-gray-950 border-b-2 border-gray-100 pt-1 pb-1 font-medium no-underline transition-all duration-200 hover:bg-[#05C898]/10 text-sm"
>
  Beni X'te takip et
</Link>
      </CardContent>
    </Card>
  )
}

export default Avatar