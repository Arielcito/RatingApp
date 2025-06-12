import React from "react";
import Image from "next/image";
import BlogItem from "@/components/Blog/BlogItem";
import { getPosts } from "@/sanity/sanity-utils";
import Link from "next/link";
import { InteractiveTV } from "@/components/Blog/interactive-tv";
import { getVideosFromAPI } from "@/data/videos";

const Blog = async () => {
  const posts = await getPosts();
  posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  console.log("Logging posts data for blog section", posts);
  
  // Obtener videos desde la API
  const videos = await getVideosFromAPI();
  console.log("Logging videos data for interactive TV section", videos);
  
  return (
    <section
      className="flex flex-col items-center pb-[60px] pt-[110px]"
      id="blog"
    >
      {/* Sección de TV Interactiva */}
      <div className="container mb-16">
        <InteractiveTV videos={videos} />
      </div>

      {/* Sección de Noticias del Blog */}
      <div className="container mb-10 flex flex-col items-start justify-between md:flex-row">
        <div className="mb-8 w-full pr-0 md:mb-0 md:w-2/3 md:pr-8">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            Últimas noticias
          </h3>
          {posts?.length > 0 && <BlogItem blog={posts[0]} key={posts[0]._id} />}
        </div>
        <div className="w-full space-y-4 md:w-1/3">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            Más noticias
          </h3>
          {posts?.slice(1, 4).map((post) => (
            <div key={post._id} className="mb-4">
              <Link href={`/blog/${post.slug.current}`}>
                <h4 className="text-lg font-semibold text-black hover:text-primary dark:text-white">
                  {post.title}
                </h4>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {post.title}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="container text-center">
        <Link
          href="/blog"
          className="rounded bg-primary px-4 py-2 font-bold text-white hover:bg-opacity-90"
        >
          Ver todas las noticias
        </Link>
      </div>
    </section>
  );
};

export default Blog;
