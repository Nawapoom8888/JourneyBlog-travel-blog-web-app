import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

export default function LatestBlogs(props) {
  return (
    <div className="border-b-2 py-2">
      <Link
        href={`/blog/${props.blog.slug}`}
        className="border-test text-base font-bold text-gray-800 hover:underline"
      >
        {props.blog.title.length > 40
          ? `${props.blog.title.substring(0, 40)}...`
          : props.blog.title}
      </Link>

      <p className="mt-1 text-xs">{dayjs(props.blog.createdAt).fromNow()}</p>
    </div>
  );
}
