import BlogItem from "@/components/BlogItem";
import BlogsList from "@/components/BlogsList";
import BodyWrapper from "@/components/BodyWrapper";
import Link from "next/link";
import { cookies } from "next/headers";

async function getMyBlogs() {
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");
  // console.log("nextAuthSessionToken", nextAuthSessionToken);
  const apiUrl = `${process.env.API}/user/my-blogs`;
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
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Home() {
  const myBlogs = await getMyBlogs();

  console.log("hi");

  // const handleDelete = async (id) => {
  //   console.log(id);
  //   try {
  //     const response = await fetch(`${process.env.API}/user/blog/${id}`, {
  //       method: "DELETE",
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to delete blog");
  //     }
  //     // router.back();
  //     window.location.href = "/dashboard/user/blog/list";
  //     toast.success("Blog deleted successfully");
  //   } catch (error) {
  //     console.error("Error deleting blog:", error);
  //     toast.error("Failed to delete blog");
  //   }
  // };

  return (
    <div className="">
      <p className="text-xl font-semibold">My Blogs</p>
      <br />
      <div className="mx-auto max-w-[50rem]">
        {myBlogs.map((item) => (
          <div
            className="flex flex-col items-center gap-x-8 gap-y-6 max-sm:mb-10 sm:flex-row [&:not(:last-child)]:mb-6"
            key={item._id}
          >
            <BlogItem blog={item} />
            <div className="flex items-center gap-5">
              <Link
                href={`/dashboard/user/blog/edit/${item.slug}`}
                className="rounded-md bg-cyan-600 px-3 py-1 text-sm text-gray-100 transition-all duration-200 hover:bg-cyan-700"
              >
                Edit
              </Link>
              {/* <button onClick={() => handleDelete(item._id)} className="">
                  Delete
                </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
