import React from "react";
import Link from "next/link";
import BodyWrapper from "@/components/BodyWrapper";

export default function layout(props) {
  return (
    <BodyWrapper>
      <div className="border-test mb-6 mt-4 flex flex-col items-center">
        <div className="border-test mb-10 flex flex-col items-center">
          <h1 className="text-2xl font-semibold">Admin</h1>
        </div>

        <div className="border-test mb-6 flex h-full w-full justify-center gap-10 border-b-2 border-gray-300 pb-4 text-base font-semibold">
          <Link href={"/dashboard/admin"} className="hover:underline">
            All User Blogs
          </Link>
          <Link
            href={"/dashboard/admin/blog/create"}
            className="hover:underline"
          >
            Create Blog
          </Link>
        </div>

        <div className="flex h-full justify-center">{props.children}</div>
      </div>
    </BodyWrapper>
  );
}
