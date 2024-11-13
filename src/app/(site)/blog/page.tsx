import { getPosts } from "@/sanity/sanity-utils";
import BlogItem from "@/components/Blog/BlogItem";
import { Metadata } from "next";
import { Post } from "@/types/Post";

export const metadata: Metadata = {
  title: `Blog - ${process.env.SITE_NAME}`,
  description: `Artículos y noticias sobre ${process.env.SITE_NAME}`,
};

export default async function BlogPage() {
  try {
    const posts = await getPosts();

    return (
      <main className="min-h-screen">
        <section className="pb-[60px] pt-[150px] lg:pt-[150px]">
          <div className="container overflow-hidden lg:max-w-[1250px]">
            <h1 className="text-4xl font-bold text-center mb-12">
              Nuestro Blog
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
              {posts?.length > 0 ? (
                posts.map((post: Post) => (
                  <BlogItem key={post._id} blog={post} />
                ))
              ) : (
                <p className="text-center text-gray-600 py-10 col-span-full">
                  No hay artículos disponibles en este momento.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          Ha ocurrido un error al cargar los artículos. Por favor, intenta más tarde.
        </p>
      </div>
    );
  }
}
