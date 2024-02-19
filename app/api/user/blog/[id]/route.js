import { NextResponse } from "next/server";
import dbConnection from "@/utils/dbConnection";
import Blog from "@/models/blog";

export async function PUT(req, context) {
  await dbConnection();
  const _req = await req.json();

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      context.params.id,
      { ..._req },
      { new: true },
    );

    if (!updatedBlog) {
      return res.status(404).json({
        error: "Blog not found",
      });
    }
    return NextResponse.json(updatedBlog, { status: 200 });
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

export async function DELETE(req, context) {
  await dbConnection();

  try {
    const deletedBlog = await Blog.findByIdAndDelete(context.params.id);
    if (!deletedBlog) {
      return res.status(404).json({
        error: "Blog not found",
      });
    }
    return NextResponse.json(deletedBlog, { status: 200 });
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
