"use client";

import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function page() {
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password);

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      setLoading(true);
      const response = await fetch(`${process.env.API}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data.err);
        setLoading(false);
        return;
      }

      const data = await response.json();
      toast.success(data.success);
      setLoading(false);
      router.push("/login");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("There are some errors, Please try again.");
    }
  };

  return (
    <div style={{ height: "calc(100vh - 5rem)" }} className="w-full px-6">
      <div className="border-test mx-auto flex h-full w-full max-w-5xl items-center justify-center py-12">
        <div className="border-test grid h-[32rem] grid-cols-1 overflow-hidden rounded-3xl shadow-lg max-md:mx-auto max-md:max-w-[30rem] md:w-full md:grid-cols-[65%_35%]">
          <div className="h-full w-full bg-blue-900 max-md:hidden">
            <img
              src="https://images.unsplash.com/photo-1480996408299-fc0e830b5db1?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="h-full w-full object-cover brightness-90"
            />
          </div>
          <div className="border-test flex w-full flex-col items-center justify-center bg-white px-8 shadow-lg">
            <h1 className="border-test mb-6 text-xl font-semibold">Sign Up</h1>
            <div className="border-test grid w-full grid-cols-1">
              <form
                onSubmit={handleSubmit}
                className="border-test flex w-full flex-col"
              >
                <label className="">Name *</label>
                <input
                  type="text"
                  className="mb-4 rounded-lg border-2 border-gray-300 px-3 py-1 outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label className="">Email *</label>
                <input
                  type="email"
                  className="mb-4 rounded-lg border-2 border-gray-300 px-3 py-1 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label className="">Password *</label>
                <input
                  type="password"
                  className="mb-4 rounded-lg border-2 border-gray-300 px-3 py-1 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label className="">Confirm Password *</label>
                <input
                  type="password"
                  className="mb-4 rounded-lg border-2 border-gray-300 px-3 py-1 outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                  className="mt-4 cursor-pointer rounded-lg bg-cyan-600 py-3 text-center text-base font-medium text-gray-100 transition-all duration-200 hover:bg-cyan-700"
                  type="submit"
                  disabled={
                    loading || !name || !email || !password || !confirmPassword
                  }
                >
                  {loading ? "LOADING..." : "SIGN UP"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}