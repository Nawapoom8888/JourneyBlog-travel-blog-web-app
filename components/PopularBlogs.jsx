import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import LikeButton from "./LikeButton";

dayjs.extend(relativeTime);

export default function PopularBlogs(props) {
  return (
    <div className="border-b-2 py-2">
      <Link
        href={`/blog/${props.blog.slug}`}
        className="border-test text-base font-bold text-gray-800 hover:underline"
      >
        {props.blog.title.length > 53
          ? `${props.blog.title.substring(0, 53)}...`
          : props.blog.title}
      </Link>

      <div className="mt-1 flex gap-1 text-xs">
        <LikeButton blog={props.blog} />
        <p className="">Likes</p>
      </div>
    </div>
  );
}
