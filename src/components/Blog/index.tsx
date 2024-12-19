import React from "react";
import Image from "next/image";
import BlogItem from "@/components/Blog/BlogItem";
import { getPosts } from "@/sanity/sanity-utils";
import Link from "next/link";
import { Video, mainVideo, sideVideos } from "@/data/videos";

const VideoPlayer = ({ video }: { video: Video }) => (
  <div className="relative w-full pt-[56.25%]">
    <iframe
      is="x-frame-bypass"
      src={video.url}
      className="absolute left-0 top-0 h-full w-full"
      title={video.title}
    />
  </div>
);

const Blog = async () => {
  const posts = await getPosts();
  console.log(posts);
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
        <div className="mb-8 mr-10 w-full pr-0 md:mb-0 md:w-2/3 md:pr-8">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            Ultimas noticias
          </h3>
          <VideoPlayer video={mainVideo} />
        </div>
        <div className="w-full md:w-1/4">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            Nuestras historias
          </h3>
          <div className="scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100 dark:scrollbar-track-dark max-h-[500px] space-y-4 overflow-y-auto pr-2">
            {sideVideos.map((video) => (
              <div key={video.id} className="last:mb-2">
                <VideoPlayer video={video} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container mb-10 flex flex-col items-start justify-between md:flex-row">
        <div className="mb-8 w-full pr-0 md:mb-0 md:w-2/3 md:pr-8">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            Ultimas noticias
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
