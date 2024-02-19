"use client";
import React from "react";
import Link from "next/link";
import BodyWrapper from "@/components/BodyWrapper";
import { FaUser } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function layout(props) {
  const router = useRouter();
  const { data, status } = useSession();

  console.log(data);

  return (
    <BodyWrapper>
      <div className="border-test mb-6 mt-4 flex flex-col items-center">
        <div className="border-test mb-10 flex flex-col items-center">
          <div className="mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gray-400">
            {data?.user?.image ? (
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `url(${data?.user?.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            ) : (
              <FaUser className="rounded-full text-8xl text-white" />
            )}
          </div>
          <h1 className="mb-1 text-xl font-medium">{data?.user?.name}</h1>
          <h1>{data?.user?.email}</h1>
        </div>

        <div className="border-test mb-6 flex h-full w-full justify-center gap-10 border-b-2 border-gray-300 pb-4 text-base font-semibold">
          <Link href={"/dashboard/user"} className="hover:underline">
            Liked Blogs
          </Link>
          <Link href={"/dashboard/user/blog/list"} className="hover:underline">
            My Blogs
          </Link>
          <Link
            href={"/dashboard/user/blog/create"}
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
