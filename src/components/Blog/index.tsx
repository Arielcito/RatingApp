import React from "react";
import Image from "next/image";
import BlogItem from "@/components/Blog/BlogItem";
import { getPosts } from "@/sanity/sanity-utils";
import Link from "next/link";

const Blog = async () => {
  const posts = await getPosts();
  
  return (
    <section className="pb-[60px] pt-[110px] flex flex-col items-center" id="blog">
      <div className="container">
        <div
          className="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]"
          data-wow-delay=".2s"
        >
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            Ultimas noticias 
          </h2>
          <p className="text-base text-body">
            Enterate de las ultimas noticias del ecosistema RatingApp
          </p>
        </div>
      </div>
      <div className="container flex flex-col md:flex-row justify-between items-start mb-10">
        <div className="w-full md:w-2/3 pr-0 md:pr-8 mb-8 md:mb-0">
          <div className="aspect-w-16 aspect-h-9 h-full">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video principal"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="w-full md:w-1/3 space-y-4">
          <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Nuestras historias</h3>
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="aspect-w-16 aspect-h-9">
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/dQw4w9WgXcQ?start=${index * 10}`}
                title={`Video ${index}`}
                allowFullScreen
              ></iframe>
            </div>
          ))}        
        </div>
      </div>
      <div className="container flex flex-col md:flex-row justify-between items-start mb-10">
        <div className="w-full md:w-2/3 pr-0 md:pr-8 mb-8 md:mb-0">
          {posts?.length > 0 && (
            <BlogItem blog={posts[0]} key={0} />
          )}
        </div>
        <div className="w-full md:w-1/3 space-y-4">
          <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Más noticias</h3>
          {posts?.slice(1, 4).map((post, index) => (
            <div key={index} className="mb-4">
              <Link href={`/blog/${post.slug}`}>
                <h4 className="text-lg font-semibold text-black dark:text-white hover:text-primary">{post.title}</h4>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">{post.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="container text-center">
        <Link href="/blog" className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded">
          Ver todas las noticias
        </Link>
      </div>
    </section>
  );
};

export default Blog;
