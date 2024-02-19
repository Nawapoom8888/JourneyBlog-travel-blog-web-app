import BodyWrapper from "@/components/BodyWrapper";
import React from "react";
import { cookies } from "next/headers";
import BlogsList from "@/components/BlogsList";

async function getLikedBlogs() {
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");
  // console.log("nextAuthSessionToken", nextAuthSessionToken);
  const apiUrl = `${process.env.API}/user/liked-blogs`;
  const options = {
    method: "GET",
    // cache: "no-store",
    next: { revalidate: 1 },
    headers: {
      Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
    },
  };
  try {
    const response = await fetch(apiUrl, options);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    console.log("liked Blog Data ==> ", data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function UserDashboard() {
  const likedBlogs = await getLikedBlogs();
  return (
    <div className="">
      <p className="text-xl font-semibold">Liked Blogs</p>
      <br />
      <BlogsList blogs={likedBlogs} />
    </div>
  );
}
