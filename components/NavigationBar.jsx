import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useGlobalContext } from "@/context/search";
import { FaUser } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { IoClose, IoSearch } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";

export default function NavigationBar() {
  const { data, status } = useSession();
  const { searchQuery, setSearchQuery, fetchSearchResults } =
    useGlobalContext();

  const [isOpen, setIsOpen] = React.useState(false);

  // console.log(data);
  // console.log(status);
  // console.log(searchQuery);

  return (
    <div className="border-test sticky top-0 z-50 mt-8 w-full bg-transparent">
      <div className="border-test w-full px-6">
        <div
          className={`border-test mx-auto block max-w-5xl items-center justify-between gap-7 ${
            isOpen ? "rounded-2xl" : "rounded-full"
          } bg-white px-6 py-2 shadow`}
        >
          <div className="border-test flex w-full items-center justify-between">
            <Link className="border-test text-lg font-semibold" href={"/"}>
              JourneyBlog
            </Link>
            <div className="hidden items-center gap-3 sm:flex">
              <form
                className="border-test me-2 flex h-[1.8rem] w-[16rem] overflow-hidden rounded-full border-2 bg-zinc-200 md:w-[25rem]"
                onSubmit={fetchSearchResults}
              >
                <input
                  type="text"
                  className="w-full bg-transparent px-3 text-sm text-gray-800 outline-none"
                  placeholder="Search title, content, or tags..."
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  value={searchQuery}
                />
                <button
                  className="me-2 bg-transparent text-lg text-gray-800"
                  type="submit"
                >
                  <IoSearch />
                </button>
              </form>

              {status === "authenticated" ? (
                <div className="flex gap-4">
                  <Link href={`/dashboard/${data?.user?.role}`}>
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-gray-400">
                        {data.user.image ? (
                          <div
                            className="h-full w-full"
                            style={{
                              backgroundImage: `url(${data?.user?.image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                        ) : (
                          <FaUser className="rounded-full text-xl text-white" />
                        )}
                      </div>
                      <div className="relative top-[1px] text-sm font-medium text-gray-800">
                        {data?.user?.name}
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-2"
                  >
                    <TbLogout className="text-2xl text-gray-500 transition-all duration-200 hover:text-gray-700" />
                  </button>
                </div>
              ) : (
                <div className="border-test flex gap-5 text-sm font-medium text-gray-800 transition-all duration-200 hover:text-black">
                  <Link href={"/login"}>Login</Link>
                  <Link href={"/signup"}>Signup</Link>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsOpen((open) => !open)}
              className="text-2xl sm:hidden"
            >
              {!isOpen ? <LuMenu /> : <IoClose />}
            </button>
          </div>

          {isOpen && (
            <div className="my-3 flex items-center gap-3 sm:hidden">
              <form
                className="border-test me-2 flex h-[1.8rem] w-full overflow-hidden rounded-full border-2 bg-zinc-200 md:w-[25rem]"
                onSubmit={fetchSearchResults}
              >
                <input
                  type="text"
                  className="w-full bg-transparent px-3 text-sm text-gray-800 outline-none"
                  placeholder="Search title, content, or tags..."
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  value={searchQuery}
                />
                <button
                  className="me-2 bg-transparent text-lg text-gray-800"
                  type="submit"
                >
                  <IoSearch />
                </button>
              </form>

              {status === "authenticated" ? (
                <div className="flex gap-4">
                  <Link href={`/dashboard/${data?.user?.role}`}>
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-gray-400">
                        {data.user.image ? (
                          <div
                            className="h-full w-full"
                            style={{
                              backgroundImage: `url(${data?.user?.image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                        ) : (
                          <FaUser className="rounded-full text-xl text-white" />
                        )}
                      </div>
                      <div className="relative top-[1px] text-sm font-medium text-gray-800">
                        {data?.user?.name}
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-2"
                  >
                    <TbLogout className="text-2xl text-gray-500" />
                  </button>
                </div>
              ) : (
                <div className="border-test flex items-center gap-3 text-sm font-medium text-gray-800">
                  <Link href={"/login"}>Login</Link>
                  <Link href={"/signup"}>Signup</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
