import { NextResponse } from "next/server";
import dbConnection from "@/utils/dbConnection";
import Blog from "@/models/blog";
import queryString from "query-string";

export async function GET(req) {
  // Connect to database
  await dbConnection();

  const searchParams = queryString.parseUrl(req.url).query;
  console.log(searchParams);

  const { page } = searchParams || {};

  const pageSize = 4;

  try {
    // Calculate the number of documents to skip
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * pageSize;

    // Get the total count of blogs
    const totalBlogs = await Blog.countDocuments({});

    // Retrieve the paginated blogs
    const blogs = await Blog.find({})
      .populate("postedBy", "name")
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        blogs,
        currentPage,
        totalPages: Math.ceil(totalBlogs / pageSize),
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
