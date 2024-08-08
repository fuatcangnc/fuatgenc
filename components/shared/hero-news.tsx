// components/hero-news.tsx
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Clock } from 'lucide-react'

const HeroNews = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <div className="lg:col-span-3 flex flex-col space-y-4">
        {/* Main Feature */}
        <Card className="relative overflow-hidden aspect-[21/9]"> {/* Changed from 16/9 to 21/9 */}
          <Image
            src="/path-to-balloon-image.jpg"
            alt="Father's Day gifts"
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
          <CardContent className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-4 lg:p-6">
            <Badge className="bg-purple-600 text-white mb-2">Tech</Badge>
            <h2 className="text-xl lg:text-2xl font-bold mb-2">The best Father's Day gifts for every dad in your life</h2>
            <p className="mb-4 text-sm lg:text-base line-clamp-2">What's made Amazon shoppers fall in love with Tozos? Superior audio quality, of course, courtesy of 6-millimeter speaker drivers that produce powerful, crystal-clear sound and heart-thumping bass. Trust us, these...</p>
            <div className="flex items-center text-sm">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src="/path-to-michael-avatar.jpg" alt="Michael" />
              </Avatar>
              <span className="mr-4">Michael</span>
              <Clock className="h-4 w-4 mr-1" />
              <span>2 Mins Read</span>
            </div>
          </CardContent>
        </Card>

        {/* Secondary Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="relative overflow-hidden aspect-[16/9]"> {/* Changed from 4/3 to 16/9 */}
            <Image
              src="/path-to-conservative-image.jpg"
              alt="Black Conservatives"
              layout="fill"
              objectFit="cover"
              className="z-0"
            />
            <CardContent className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-4">
              <Badge className="bg-red-600 text-white mb-2 w-fit">Business</Badge>
              <h3 className="text-base lg:text-lg font-bold mb-2 line-clamp-2">What My Mother Taught Me About Black Conservatives</h3>
              <div className="flex items-center text-xs">
                <Avatar className="h-5 w-5 mr-2">
                  <AvatarImage src="/path-to-michael-avatar.jpg" alt="Michael" />
                </Avatar>
                <span className="mr-2">Michael</span>
                <Clock className="h-3 w-3 mr-1" />
                <span>2 Mins Read</span>
              </div>
            </CardContent>
            <div className="absolute top-2 right-2 bg-black text-white rounded-full p-1">
              <span className="text-xs font-bold">8.7</span>
            </div>
          </Card>

          <Card className="relative overflow-hidden aspect-[16/9]"> {/* Changed from 4/3 to 16/9 */}
            <Image
              src="/path-to-economic-growth-image.jpg"
              alt="Economic Growth"
              layout="fill"
              objectFit="cover"
              className="z-0"
            />
            <CardContent className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-4">
              <Badge className="bg-green-600 text-white mb-2 w-fit">Active</Badge>
              <h3 className="text-base lg:text-lg font-bold mb-2 line-clamp-2">Economic Growth Is Essential. So Is Resilience</h3>
              <div className="flex items-center text-xs">
                <Avatar className="h-5 w-5 mr-2">
                  <AvatarImage src="/path-to-michael-avatar.jpg" alt="Michael" />
                </Avatar>
                <span className="mr-2">Michael</span>
                <Clock className="h-3 w-3 mr-1" />
                <span>2 Mins Read</span>
              </div>
            </CardContent>
            <div className="absolute top-2 right-2 bg-black text-white rounded-full p-1">
              <span className="text-xs font-bold">6</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Editor's Picks */}
      <div className="lg:col-span-2">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span className="bg-red-600 w-4 h-4 inline-block mr-2"></span>
          Editor pick's
        </h2>
        <div className="space-y-4 overflow-y-auto" style={{maxHeight: 'calc(100vh - 200px)'}}>
          {[
            { title: "The Unexpected Power of Seeing Yourself as a Villain", category: "Active" },
            { title: "7 food myths dietitians wish people would stop believing", category: "Health" },
            { title: "Outdoor Photo Shooting With clean and Beautiful", category: "Active" },
            { title: "How To Season 3: When Expectations Don't Meet...", category: "Sports" },
            { title: "Is This the Beginning of the End of the Internet?", category: "Health" }
          ].map((item, index) => (
            <div key={index} className="flex items-start space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold">{index + 1}</span>
              </div>
              <div>
                <Badge className={`mb-1 ${getBadgeColor(item.category)} text-white`}>
                  {item.category}
                </Badge>
                <h3 className="text-sm font-bold line-clamp-2">{item.title}</h3>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>2 Mins Read</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function getBadgeColor(category: string) {
  switch (category) {
    case 'Active':
      return 'bg-green-600';
    case 'Health':
      return 'bg-yellow-600';
    case 'Sports':
      return 'bg-blue-600';
    default:
      return 'bg-gray-600';
  }
}

export default HeroNews