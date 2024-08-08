// components/HomeCard.jsx
import Image from 'next/image';
import Link from 'next/link';

function HomeCard({ title, description, category, imagePath, bgColor }) {
  return (
    <div className={`p-6 rounded-lg mb-4 ${bgColor} min-h-[250px] `}>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-3/4 pr-4  space-y-4">
        <Link href={`/post/`} >
          <h3 className="font-semibold text-[20px] transition-colors cursor-pointer group">
            <span className="bg-left-bottom bg-gradient-to-r from-green-500 to-green-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out">
              {title}
            </span>
          </h3>
        </Link>
          <p className="text-[18px]">{description}</p>
          <span className="px-3 py-1 bg-white bg-opacity-30 rounded-full text-sm">
            {category}
          </span>
        </div>
        <div className="md:w-1/4 flex justify-center mt-4 md:mt-0">
          <div className="relative w-full h-[250px]">
            <Image 
              src={imagePath} 
              alt={title} 
              layout="fill" 
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCard;