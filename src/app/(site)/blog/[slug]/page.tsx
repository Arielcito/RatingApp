import React from "react";
import { getPostBySlug, imageBuilder } from "@/sanity/sanity-utils";
import RenderBodyContent from "@/components/Blog/RenderBodyContent";
import Link from "next/link";
import Image from "next/image";
import { structuredAlgoliaHtmlData } from "@/libs/crawlIndex";
import SocialShare from "@/components/Blog/SocialShare";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  const siteURL = process.env.SITE_URL;
  const authorName = process.env.AUTHOR_NAME;

  if (post) {
    return {
      title: `${
        post.title || "Pagina individual"
      } | ${authorName} - Blog post`,
      description: `${post.metadata?.slice(0, 136)}...`,
      author: authorName,
      alternates: {
        canonical: `${siteURL}/blog/${post?.slug?.current}`,
        languages: {
          "en-US": "/en-US",
          "es-ES": "/es-ES",
        },
      },

      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },

      openGraph: {
        title: `${post.title} | ${authorName}`,
        description: post.metadata,
        url: `${siteURL}/blog/${post?.slug?.current}`,
        siteName: authorName,
        images: [
          {
            url: imageBuilder(post.mainImage).url(),
            width: 1800,
            height: 1600,
            alt: post.title,
          },
        ],
        locale: "en_US",
        type: "article",
      },

      twitter: {
        card: "summary_large_image",
        title: `${post.title} | ${authorName}`,
        description: `${post.metadata?.slice(0, 136)}...`,
        creator: `@${authorName}`,
        site: `@${authorName}`,
        images: [imageBuilder(post?.mainImage).url()],
        url: `${siteURL}/blog/${post?.slug?.current}`,
      },
    };
  } else {
    return {
      title: "Not Found",
      description: "No blog article has been found",
    };
  }
}

const SingleBlog = async ({ params }: Props) => {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  const postURL = `${process.env.SITE_URL}blog/${post?.slug?.current}`;

  await structuredAlgoliaHtmlData({
    type: "blog",
    title: post?.title || "",
    htmlString: post?.metadata || "",
    pageUrl: `${process.env.SITE_URL}/blog/${post?.slug?.current}`,
    imageURL: imageBuilder(post?.mainImage).url() as string,
  });

  return (
    <main>
      {/* <!-- ===== Blog Details Section Start ===== --> */}
      <section className="pb-[60px] pt-[150px] lg:pt-[220px]">
        <div className="container overflow-hidden lg:max-w-[1250px]">
          <div className="mx-auto w-full max-w-[970px]">
            <div className="wow fadeInUp mb-10" data-wow-delay=".2s">
              <Image
                className="object-conter w-full object-cover"
                src={imageBuilder(post.mainImage).url() as string}
                alt={post.title}
                width={970}
                height={430}
                unoptimized={true}
              />
            </div>

            <div className="mx-auto w-full max-w-[770px] text-center">
              <h1
                className="wow fadeInUp mb-5 text-[28px] font-semibold leading-tight text-black dark:text-white sm:text-[32px]"
                data-wow-delay=".25s"
              >
                {post.title}
              </h1>
              <div
                className="wow fadeInUp -mx-3 mb-9 flex flex-wrap items-center justify-center"
                data-wow-delay=".3s"
              >
                <div className="mb-2 inline-flex items-center px-3">
                  <div className="mr-3 h-10 w-full max-w-[40px] rounded-full">
                    <Link href={`/blog/author/${post?.author?.slug?.current}`}>
                      <Image
                        src={imageBuilder(post?.author?.image).url() as string}
                        alt={post?.author?.name}
                        width={40}
                        height={40}
                        className="h-full w-full rounded-full object-cover object-center"
                        unoptimized={true}
                      />
                    </Link>
                  </div>
                  <p className="min-w-fit text-base font-medium text-body">
                    <Link href={`/blog/author/${post?.author?.slug?.current}`}>
                      By {post?.author?.name}
                    </Link>
                  </p>
                </div>

                <div className="mb-2 inline-flex items-center px-3">
                  <Link
                    href={`/blog/author/${post?.author?.slug?.current}`}
                    className="flex items-center text-base font-medium text-body"
                  >
                    <span className="mr-2">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_59_156)">
                          <path
                            d="M15.5833 2.74984H19.2499C19.493 2.74984 19.7262 2.84641 19.8981 3.01832C20.07 3.19023 20.1666 3.42339 20.1666 3.6665V18.3332C20.1666 18.5763 20.07 18.8094 19.8981 18.9814C19.7262 19.1533 19.493 19.2498 19.2499 19.2498H2.74992C2.5068 19.2498 2.27365 19.1533 2.10174 18.9814C1.92983 18.8094 1.83325 18.5763 1.83325 18.3332V3.6665C1.83325 3.42339 1.92983 3.19023 2.10174 3.01832C2.27365 2.84641 2.5068 2.74984 2.74992 2.74984H6.41658V0.916504H8.24992V2.74984H13.7499V0.916504H15.5833V2.74984ZM13.7499 4.58317H8.24992V6.4165H6.41658V4.58317H3.66659V8.24984H18.3333V4.58317H15.5833V6.4165H13.7499V4.58317ZM18.3333 10.0832H3.66659V17.4165H18.3333V10.0832Z"
                            fill="#79808A"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_59_156">
                            <rect width="22" height="22" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>

                    {new Date(post?.publishedAt as string)
                      .toDateString()
                      .split(" ")
                      .slice(1)
                      .join(" ")}
                  </Link>
                </div>

                <div className="mb-2 inline-flex items-center px-3">
                  <p className="flex items-center text-base font-medium text-body">
                    <span className="mr-2">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_59_159)">
                          <path
                            d="M5.917 17.4167L1.83325 20.625V3.66667C1.83325 3.42355 1.92983 3.19039 2.10174 3.01849C2.27365 2.84658 2.5068 2.75 2.74992 2.75H19.2499C19.493 2.75 19.7262 2.84658 19.8981 3.01849C20.07 3.19039 20.1666 3.42355 20.1666 3.66667V16.5C20.1666 16.7431 20.07 16.9763 19.8981 17.1482C19.7262 17.3201 19.493 17.4167 19.2499 17.4167H5.917ZM5.28267 15.5833H18.3333V4.58333H3.66659V16.8529L5.28267 15.5833ZM10.0833 9.16667H11.9166V11H10.0833V9.16667ZM6.41658 9.16667H8.24992V11H6.41658V9.16667ZM13.7499 9.16667H15.5833V11H13.7499V9.16667Z"
                            fill="#79808A"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_59_159">
                            <rect width="22" height="22" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    50
                  </p>
                </div>

                <div className="mb-2 inline-flex items-center px-3">
                  <p className="flex items-center text-base font-medium text-body">
                    <span className="mr-2">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_59_162)">
                          <path
                            d="M10.9999 2.75C15.9426 2.75 20.0548 6.30667 20.9174 11C20.0557 15.6933 15.9426 19.25 10.9999 19.25C6.05727 19.25 1.9451 15.6933 1.08252 11C1.94419 6.30667 6.05727 2.75 10.9999 2.75ZM10.9999 17.4167C12.8695 17.4163 14.6835 16.7813 16.1451 15.6156C17.6067 14.4499 18.6293 12.8226 19.0455 11C18.6277 9.17886 17.6045 7.55334 16.143 6.38919C14.6816 5.22504 12.8684 4.59115 10.9999 4.59115C9.13149 4.59115 7.31832 5.22504 5.85686 6.38919C4.39541 7.55334 3.37214 9.17886 2.95435 11C3.37061 12.8226 4.39322 14.4499 5.85482 15.6156C7.31642 16.7813 9.13042 17.4163 10.9999 17.4167ZM10.9999 15.125C9.90592 15.125 8.85671 14.6904 8.08312 13.9168C7.30953 13.1432 6.87494 12.094 6.87494 11C6.87494 9.90598 7.30953 8.85677 8.08312 8.08319C8.85671 7.3096 9.90592 6.875 10.9999 6.875C12.094 6.875 13.1432 7.3096 13.9168 8.08319C14.6903 8.85677 15.1249 9.90598 15.1249 11C15.1249 12.094 14.6903 13.1432 13.9168 13.9168C13.1432 14.6904 12.094 15.125 10.9999 15.125ZM10.9999 13.2917C11.6077 13.2917 12.1906 13.0502 12.6204 12.6205C13.0502 12.1907 13.2916 11.6078 13.2916 11C13.2916 10.3922 13.0502 9.80932 12.6204 9.37955C12.1906 8.94978 11.6077 8.70833 10.9999 8.70833C10.3921 8.70833 9.80925 8.94978 9.37948 9.37955C8.94971 9.80932 8.70827 10.3922 8.70827 11C8.70827 11.6078 8.94971 12.1907 9.37948 12.6205C9.80925 13.0502 10.3921 13.2917 10.9999 13.2917Z"
                            fill="#79808A"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_59_162">
                            <rect width="22" height="22" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    343
                  </p>
                </div>
              </div>

              <div className="text-left">
                <div className="mb-9 text-base text-body">
                  <RenderBodyContent post={post as any} />
                </div>

      

                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-7/12">
                    <div className="wow fadeInUp" data-wow-delay=".2s">
                      <p className="mb-4 text-base text-body">Tags populares :</p>
                      <div className="flex flex-wrap items-center">
                        <Link
                          href={`/blog/tag/${
                            post?.tags ? post?.tags[0] : "not-found"
                          }`}
                          className="mb-3 mr-3 inline-flex h-9 items-center justify-center rounded bg-[#F8FAFB] px-[18px] text-sm font-semibold text-body hover:bg-primary hover:text-white dark:bg-[#15182A] dark:text-white dark:hover:bg-primary"
                        >
                          {" "}
                          {post?.tags ? post?.tags[0] : "Not added"}
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="w-full px-3 sm:w-5/12">
                    <div className="wow fadeInUp" data-wow-delay=".2s">
                      <p className="mb-4 text-base text-body sm:text-right">
                        Share this post :
                      </p>
                      <SocialShare url={postURL} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SingleBlog;
