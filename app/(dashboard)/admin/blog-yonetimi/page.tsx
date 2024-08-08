import { PostListing } from '@/components/admin/blog-yonetimi/post-listing'

// Bu fonksiyon gerçek bir veritabanından veri çekecek şekilde güncellenebilir
async function getPosts() {
  return [
    { 
      id: 1,
      title: "İlk Blog Yazısı", 
      date: "2023/07/15",
      status: "published"
    },
    { 
      id: 2,
      title: "İkinci Blog Yazısı - Taslak", 
      date: "2023/07/17",
      status: "draft"
    },
  ]
}

export default async function BlogYonetimi() {
  const posts = await getPosts()

  return (
    <div className="container mx-auto p-4">
      <PostListing initialPosts={posts} />
    </div>
  )
}