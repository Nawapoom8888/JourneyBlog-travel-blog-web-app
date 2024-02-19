"use client";
import BlogItem from "@/components/BlogItem";
import BlogsList from "@/components/BlogsList";
import BodyWrapper from "@/components/BodyWrapper";
import Link from "next/link";

async function getBlogs(searchParams) {
  const urlParams = {
    page: searchParams.page || 1,
  };

  const searchQuery = new URLSearchParams(urlParams).toString();
  // console.log(searchQuery); // page=1

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/blog?${searchQuery}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if required
      },
      // cache: "no-store", // NEVER USE THIS ANYWHERE
      next: { revalidate: 1 },
    },
  );

  if (!response.ok) {
    console.log("Failed to fetch blogs => ", response);
    throw new Error("Failed to fetch blogs.");
  }
  const data = await response.json();
  return data;
}

export default async function Home({ searchParams = { page: "1" } }) {
  const data = await getBlogs(searchParams);
  const { blogs, currentPage, totalPages } = data;

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  // console.log(data);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/blog/${id}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }
      // router.back();
      window.location.href = "/dashboard/admin";
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="">
      <p className="text-xl font-semibold">All User Blogs</p>
      <br />
      <div className="mx-auto mb-16 max-w-[50rem]">
        {blogs.map((item) => (
          <div
            className="flex flex-col items-center gap-x-8 gap-y-6 max-sm:mb-10 sm:flex-row [&:not(:last-child)]:mb-6"
            key={item._id}
          >
            <BlogItem blog={item} />
            <div className="flex items-center gap-5 px-3">
              <div className="flex items-center gap-5">
                <Link
                  href={`/dashboard/admin/blog/edit/${item.slug}`}
                  className="rounded-md bg-cyan-600 px-3 py-1 text-sm text-gray-100 transition-all duration-200 hover:bg-cyan-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="rounded-md bg-red-600 px-3 py-1 text-sm text-gray-100 transition-all duration-200 hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-center gap-3">
          {hasPreviousPage && (
            <Link
              className="border-2 border-cyan-600 bg-cyan-600 px-4 py-2 text-gray-100"
              href={`?page=${currentPage - 1}`}
            >
              Previous
            </Link>
          )}

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <Link
                key={page}
                className={`px-4 py-2 ${
                  currentPage === page
                    ? "border-2 border-cyan-600 bg-cyan-600 text-gray-100"
                    : "border-2 border-gray-300 bg-transparent"
                }`}
                href={`?page=${page}`}
              >
                {page}
              </Link>
            );
          })}

          {hasNextPage && (
            <Link
              className="border-2 border-cyan-600 bg-cyan-600 px-4 py-2 text-gray-100"
              href={`?page=${currentPage + 1}`}
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
