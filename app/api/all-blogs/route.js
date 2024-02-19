import { NextResponse } from "next/server";
import dbConnection from "@/utils/dbConnection";
import Blog from "@/models/blog";

export async function GET(req) {
  // Connect to database
  await dbConnection();

  try {
    const allBlogs = await Blog.find({})
      .populate("postedBy", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        allBlogs,
      },
      { status: 200 },
    );
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
