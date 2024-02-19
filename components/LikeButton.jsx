"use client";
import React from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { set } from "mongoose";
import { FaRegHeart } from "react-icons/fa";

export default function LikeButton({ blog }) {
  const { data, status } = useSession();
  const [likes, setLikes] = React.useState(blog?.likes);
  const router = useRouter();
  const pathname = usePathname();
  const isLiked = likes?.includes(data?.user?._id);

  const handleLike = async () => {
    if (status !== "authenticated") {
      toast.error("Please login to like");
      router.push(
        `/login?callbackUrl=${process.env.NEXT_PUBLIC_API.replace(
          "/api",
          "",
        )}${pathname}`,
      );
      return;
    }

    try {
      if (isLiked) {
        const answer = window.confirm(
          "Already liked it, Are you sure to unlike?",
        );
        if (answer) {
          handleUnlike();
        }
      } else {
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            blogId: blog._id,
          }),
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/user/blog/like`,
          options,
        );

        if (!response.ok) {
          throw new Error(
            `Failed to like: ${response.status} ${response.statusText}`,
          );
        }
        const data = await response.json();

        setLikes(data.likes);

        toast.success("Blog liked");

        router.refresh(); // only works in server components
      }
    } catch (err) {
      console.log(err);
      toast.error("Error liking blog");
    }
  };

  const handleUnlike = async () => {
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId: blog._id,
        }),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/user/blog/unlike`,
        options,
      );

      if (!response.ok) {
        throw new Error(
          `Failed to unlike: ${response.status} ${response.statusText}`,
        );
      }
      const data = await response.json();
      // console.log("blog unliked response => ", data);
      setLikes(data.likes);
      toast.success("Blog unliked");
      router.refresh();
    } catch (err) {
      console.log(err);
      toast.error("Error unliking blog");
    }
  };

  return (
    <div>
      <button
        onClick={handleLike}
        className="flex items-center justify-center gap-[6px] rounded-md text-gray-600"
      >
        <FaRegHeart className="text-base" />
        {likes?.length}
      </button>
    </div>
  );
}
