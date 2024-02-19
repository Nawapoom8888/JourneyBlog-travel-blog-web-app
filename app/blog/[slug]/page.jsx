import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import BodyWrapper from "@/components/BodyWrapper";
import LikeButton from "@/components/LikeButton";
import Image from "next/image";
dayjs.extend(relativeTime);

async function getBlog(slug) {
  const apiUrl = `${process.env.API}/blog/${slug}`;

  const options = {
    method: "GET",
    next: { revalidate: 1 },
    // cache: "no-store", // required to update likes later
  };

  try {
    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function page({ params }) {
  const blog = await getBlog(params.slug);
  // console.log("blog slug", blog.slug);

  return (
    <BodyWrapper>
      <div className="border-test mb-2 text-left">
        <Link href={`/blog/${blog.slug}`} className="text-3xl font-bold">
          {blog.title}
        </Link>
      </div>
      <div className="border-test mb-4 flex justify-between gap-5">
        <div className="flex items-center justify-start gap-5 text-sm">
          <div className="flex">
            <p className="me-1">By</p>
            <p className="font-semibold">{blog.postedBy?.name || "User"}</p>
          </div>

          <p className="text-muted">
            Posted on {dayjs(blog.updatedAt).format("DD MMMM YYYY, HH:MM")}
          </p>
        </div>
        <div className="border-test me-1 flex gap-[5px]">
          <LikeButton blog={blog} />
          <p className="text-gray-600">Likes</p>
        </div>
      </div>

      <div className="mb-6 h-[18rem] w-full overflow-hidden rounded-lg sm:h-[30rem]">
        <Image
          src={blog?.image || "/images/default-img.jpg"}
          width={2000}
          height={1000}
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
          alt={blog.title}
        />
      </div>
      <div className="border-test w-full">
        <div
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
          className="border-test mb-6 break-all text-sm"
        ></div>

        <div className="border-test flex items-center justify-start">
          <p className="me-3 text-sm font-medium">Tags : </p>
          <div className="flex gap-2">
            {blog.category.split(/[\s,]+/).map((tag) => (
              <div className="border-test rounded-xl bg-cyan-600 px-[8px] py-[1px] text-[10px] font-medium text-white">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </BodyWrapper>
  );
}
