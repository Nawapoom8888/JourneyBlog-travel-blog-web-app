"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa6";
import Image from "next/image";

export default function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      setLoading(false);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Login Successful!");
        router.push(callbackUrl);
      }
    } catch (err) {
      setLoading(false);

      console.log(err);
      toast.error("There are some errors, Please try again.");
    }
  };
  return (
    <div style={{ height: "calc(100vh - 5rem)" }} className="w-full px-6">
      <div className="border-test mx-auto flex h-full w-full max-w-5xl items-center justify-center py-12">
        <div className="border-test grid h-[30rem] grid-cols-1 overflow-hidden rounded-3xl shadow-lg max-md:mx-auto max-md:max-w-[30rem] md:w-full md:grid-cols-[65%_35%]">
          <div className="h-full w-full max-md:hidden">
            <Image
              src="/images/login-bg.jpg"
              alt="login-background"
              width={1800}
              height={1500}
              className="h-full w-full object-cover brightness-95"
            />
          </div>
          <div className="border-test flex h-full w-full flex-col items-center justify-center bg-white p-8 shadow-lg">
            <h1 className="border-test mb-6 text-xl font-semibold">Log In</h1>
            <div className="border-test grid w-full grid-cols-1">
              <form
                onSubmit={handleSubmit}
                className="border-test flex w-full flex-col"
              >
                <label className="">Email</label>
                <input
                  type="email"
                  className="mb-4 rounded-lg border-2 border-gray-300 px-3 py-1 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label className="">Password</label>
                <input
                  type="password"
                  className="mb-4 rounded-lg border-2 border-gray-300 px-3 py-1 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="mt-6 cursor-pointer rounded-lg bg-cyan-600 py-3 text-center text-base font-medium text-gray-100 transition-all duration-200 hover:bg-cyan-700"
                  type="submit"
                  disabled={loading || !email || !password}
                >
                  {loading ? "LOADING..." : "LOGIN"}
                </button>
                <p className="mt-4 text-center">- or -</p>
                <a
                  className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-500 px-3 py-3 text-center text-base font-medium text-gray-100 transition-all duration-200 hover:bg-red-600"
                  onClick={() => signIn("google", { callbackUrl: callbackUrl })}
                >
                  <FaGoogle className="text-xl" />
                  Sign In with Google
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
