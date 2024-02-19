import { NextResponse } from "next/server";
import dbConnection from "@/utils/dbConnection";
import Blog from "@/models/blog";

export async function GET(req, context) {
  // Connect to database for retrieving blog data.
  await dbConnection();

  try {
    const blog = await Blog.findOne({ slug: context.params.slug }).populate(
      "postedBy",
      "name",
    );
    return NextResponse.json(blog, { status: 200 });
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
