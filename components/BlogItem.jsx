import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeButton from "./LikeButton";
import { FaUser } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import Image from "next/image";

dayjs.extend(relativeTime);

export default function BlogItem(props) {
  return (
    <div className="border-test grid h-[25rem] w-full grid-rows-[16rem_1fr] sm:h-[12rem] sm:grid-cols-[12rem_1fr] sm:grid-rows-1">
      <Link
        className="border-test mb-2 overflow-hidden rounded-lg sm:mb-0"
        href={`/blog/${props.blog.slug}`}
      >
        <Image
          src={props?.blog?.image || "/images/default-img.jpg"}
          width={500}
          height={500}
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
          alt={props.blog.title}
        />
      </Link>

      <div className="border-test flex w-full flex-col flex-wrap justify-between pb-3  pt-1 sm:px-4">
        <div className="flex w-full flex-col gap-2">
          <div className="w-full truncate text-gray-800">
            <Link
              href={`/blog/${props.blog.slug}`}
              className="border-test text-base font-bold hover:underline"
            >
              {/* {props.blog.title} */}
              {props.blog.title.length > 45
                ? `${props.blog.title.substring(0, 45)}...`
                : props.blog.title}
            </Link>
          </div>

          <div className="border-test mb-2 flex w-full flex-wrap gap-2 overflow-hidden">
            {props.blog.category
              .split(/[\s,]+/)
              .slice(0, 5)
              .map((tag) => (
                <div className="border-test rounded-xl bg-cyan-600 px-[8px] py-[1px] text-[10px] font-medium text-white">
                  {tag}
                </div>
              ))}
          </div>

          <div className="border-test mb-4 overflow-hidden">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  props.blog.content.length > 140
                    ? `${props.blog.content.substring(0, 140)}...`
                    : props.blog.content,
              }}
              className="break-all text-xs text-gray-600"
            ></div>
          </div>
        </div>

        <div className="border-test grid grid-cols-3 text-gray-600">
          <div className="border-test flex items-center gap-2 text-xs">
            <FaUser className="text-base" />
            <p className="">by {props.blog.postedBy?.name || "User"}</p>
          </div>

          <div className="border-test flex items-center justify-center gap-2 text-xs">
            <MdAccessTime className="text-lg" />
            {dayjs(props.blog.createdAt).format("DD MMMM YYYY")}
          </div>

          <div className="border-test flex items-center justify-end gap-1 text-xs">
            <LikeButton blog={props.blog} />
            <p className="">Likes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
