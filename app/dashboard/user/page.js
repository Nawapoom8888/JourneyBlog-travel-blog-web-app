"use client";
import React from "react";
import toast from "react-hot-toast";
import BlogsList from "@/components/BlogsList";

export default function page() {
  const [likedBlogs, setLikeBlogs] = React.useState([]);

  React.useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/user/liked-blogs`,
      );
      if (!response.ok) {
        toast.error("Failed to fetch liked blogs");
        throw new Error("Failed to fetch liked blogs");
      } else {
        const data = await response.json();
        setLikeBlogs(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <p className="text-xl font-semibold">Liked Blogs</p>
      <br />
      <BlogsList blogs={likedBlogs} />
    </div>
  );
}
