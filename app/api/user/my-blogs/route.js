import { NextResponse } from "next/server";
import dbConnection from "@/utils/dbConnection";
import Blog from "@/models/blog";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
  await dbConnection();

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  try {
    // Find blogs that have the user's _id in PostedBy (Blogs which this user has created)
    const myBlogs = await Blog.find({
      postedBy: token.user._id,
    })
      .populate("postedBy", "name")
      .sort({ createdAt: -1 });
    return NextResponse.json(myBlogs, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        err: "Server error. Please try again.",
      },
      { status: 500 },
    );
  }
}
