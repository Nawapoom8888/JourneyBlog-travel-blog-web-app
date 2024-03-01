import BlogsList from "@/components/BlogsList";
import BodyWrapper from "@/components/BodyWrapper";
import LatestBlogs from "@/components/LatestBlogs";
import PopularBlogs from "@/components/PopularBlogs";
import Link from "next/link";
// export const dynamic = "force-dynamic";
// export const revalidate = 3600; // revalidate at most every 1 second

async function getBlogs(searchParams) {
  const urlParams = {
    page: searchParams.page || 1,
  };
  const searchQuery = new URLSearchParams(urlParams).toString();
  console.log(searchQuery); // page=1

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

async function getAllBlogs() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/all-blogs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Add any additional headers if required
    },
    // cache: "no-store", // NEVER USE THIS ANYWHERE
    next: { revalidate: 1 },
  });

  if (!response.ok) {
    console.log("Failed to fetch blogs => ", response);
    throw new Error("Failed to fetch blogs.");
  }

  const data = await response.json();
  return data;
}

export default async function Home({ searchParams = { page: "1" } }) {
  const { blogs, currentPage, totalPages } = await getBlogs(searchParams);
  // const { allBlogs } = await getAllBlogs();
  // console.log(allBlogs);

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  let allBlogs = [];

  for (let page = 1; page <= totalPages; page++) {
    const searchParams = { page: page.toString() };
    const { blogs } = await getBlogs(searchParams);
    allBlogs = allBlogs.concat(blogs);
  }

  return (
    <div>
      <BodyWrapper>
        <div className="border-test mb-12 grid h-full justify-center gap-x-10 gap-y-16 lg:grid-cols-[2fr_1fr]">
          <BlogsList blogs={blogs} />
          <div className="border-test flex flex-col gap-12">
            <div className="border-test w-full rounded-lg bg-white">
              <div className="mb-4 inline-block border-b-4 border-black">
                <h1 className="text-xl font-semibold">Latest</h1>
              </div>

              {allBlogs.slice(0, 5).map((blog, index) => (
                <div key={index}>
                  <LatestBlogs blog={blog} />
                </div>
              ))}
            </div>
            <div className="border-test w-full rounded-lg bg-white">
              <div className="mb-4 inline-block border-b-4 border-black">
                <h1 className="text-xl font-semibold">Popular</h1>
              </div>

              {allBlogs
                .sort((a, b) => b.likes.length - a.likes.length)
                .slice(0, 5)
                .map((blog, index) => (
                  <div key={index}>
                    <PopularBlogs blog={blog} />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-center gap-2">
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
                  // onClick={handleReload}
                >
                  {page}
                </Link>
              );
            })}

            {hasNextPage && (
              <Link
                className="border-2 border-cyan-600 bg-cyan-600 px-4 py-2 text-gray-100"
                href={`?page=${currentPage + 1}`}
                // onClick={handleReload}
              >
                Next
              </Link>
            )}
          </div>
        </div>
      </BodyWrapper>
    </div>
  );
}
