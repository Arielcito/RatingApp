import React from "react";
import { getPosts } from "@/sanity/sanity-utils";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Todas las Noticias | RatingApp",
  description: "Todas las noticias y actualizaciones del ecosistema RatingApp",
};

const AllBlogsPage = async () => {
  const posts = await getPosts();

  return (
    <section className="pt-[150px] pb-[120px]">
      <div className="container">
        <div className="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center">
          <h1 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            Noticias RatingApp
          </h1>
          <p className="text-base text-body">
            Enterate de todas las novedades del ecosistema RatingApp
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post) => (
            <div 
              key={post._id}
              className="wow fadeInUp group relative overflow-hidden rounded-lg bg-white shadow-one dark:bg-dark"
              data-wow-delay=".1s"
            >
              <Link 
                href={`/blog/${post.slug}`}
                className="relative block aspect-[37/25] w-full"
              >
                <Image
                  src={post.image || "/images/blog/placeholder.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover object-center transition duration-300 group-hover:scale-105"
                />
              </Link>
              <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
                <h3>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base text-body-color dark:border-white dark:border-opacity-10">
                  {post.overview || post.title}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <span className="text-sm font-medium text-body-color">
                        {new Date(post._createdAt).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm font-medium text-primary"
                  >
                    Leer más
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts?.length === 0 && (
          <div className="text-center">
            <p className="text-lg text-body">No hay noticias disponibles en este momento.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBlogsPage;
