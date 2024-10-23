import React from "react";
import Image from "next/image";
import BlogItem from "@/components/Blog/BlogItem";
import { getPosts } from "@/sanity/sanity-utils";
import Link from "next/link";

const Blog = async () => {
  const posts = await getPosts();

  return (
    <section
      className="flex flex-col items-center pb-[60px] pt-[110px]"
      id="blog"
    >
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
      <div className="container mb-10 flex flex-col items-start justify-between md:flex-row">
        <div className="mb-8 w-full pr-0 md:mb-0 md:w-2/3 md:pr-8 mr-10">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            Ultimas noticias
          </h3>
          <div className="aspect-w-16 aspect-h-9 h-full">
            <iframe
              src="https://drive.google.com/file/d/1WPYdsUP_VXov3gMKZgB2U1Hx8ZdLNX9a/preview"
              width="640"
              height="480"
              allow="autoplay"
            ></iframe>
          </div>
        </div>
        <div className="w-full space-y-4  md:w-1/4">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            Nuestras historias
          </h3>
          {[1, 2].map((index) => (
            <div key={index} className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://drive.google.com/file/d/1WPYdsUP_VXov3gMKZgB2U1Hx8ZdLNX9a/preview"
                width="300"
                height="200"
                allow="autoplay"
              ></iframe>
            </div>
          ))}
        </div>
      </div>
      <div className="container mb-10 flex flex-col items-start justify-between md:flex-row">
        <div className="mb-8 w-full pr-0 md:mb-0 md:w-2/3 md:pr-8">
        <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            Ultimas noticias
          </h3>
          {posts?.length > 0 && <BlogItem blog={posts[0]} key={0} />}
        </div>
        <div className="w-full space-y-4 md:w-1/3">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            Más noticias
          </h3>
          {posts?.slice(1, 4).map((post, index) => (
            <div key={index} className="mb-4">
              <Link href={`/blog/${post.slug}`}>
                <h4 className="text-lg font-semibold text-black hover:text-primary dark:text-white">
                  {post.title}
                </h4>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
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
