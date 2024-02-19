"use client";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { FaCamera } from "react-icons/fa";
import Image from "next/image";

export default function page() {
  const router = useRouter();

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // Upload image to Cloudinary.
  const uploadImage = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

      // Upload image to Cloudinary.
      try {
        const response = await fetch(process.env.CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          setLoading(false);
          const data = await response.json();
          setImage(data.secure_url);
          // console.log(data);
        } else {
          console.log("Image upload failed");
        }
      } catch (err) {
        console.log("Error uploading image:", err);
      }
      setLoading(false);
    }
  };

  // Handle form submit to create blog in API routes.
  const createBlog = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/blog`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            category,
            image,
          }),
        },
      );
      if (response.ok) {
        router.push("/dashboard/admin");
        toast.success("Blog created successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.err);
      }
    } catch (err) {
      console.log("err => ", err);
      toast.error("An error occurred while creating the blog");
    }
  };

  return (
    <div className="w-[20rem] sm:w-[30rem] md:w-[50rem]">
      <h1 className="text-xl font-semibold">Create Blogs</h1>
      <br />
      <div className="flex flex-col justify-between gap-5">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="mb-4 h-[18rem] w-full">
            {image ? (
              <Image
                src={image}
                width={2000}
                height={1000}
                style={{ objectFit: "cover", height: "100%", width: "100%" }}
                alt={title}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-300">
                <FaCamera className="text-6xl text-gray-500" />
              </div>
            )}
          </div>

          <div className="border-test w-full">
            <div className="border-test">
              <div className="inline-block">
                {loading ? "Uploading..." : "Upload Image : "}
              </div>
              <button className="flex w-full bg-gray-200">
                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadImage}
                  required
                  className=" items-start"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <label>Title :</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-[1px] border-zinc-300 px-3 py-1 outline-none"
            required
          ></input>
        </div>

        <div className="mb-10 flex h-[30rem] w-full flex-col gap-2 sm:mb-2">
          <label>Content :</label>
          <div className="h-[26rem]">
            <ReactQuill
              value={content}
              onChange={(e) => setContent(e)}
              className="h-full"
              placeholder="Write your story here..."
              required
            ></ReactQuill>
          </div>
        </div>

        <div className="mb-6 flex w-full flex-col gap-2">
          <label>Tags : (e.g. food, culture, temple, etc.)</label>
          <input
            type="text"
            value={category}
            placeholder="food, culture, temple, etc."
            onChange={(e) => setCategory(e.target.value)}
            className="border-[1px] border-zinc-300 px-3 py-1 outline-none"
            required
          ></input>
        </div>

        <div className="flex w-full justify-center">
          <button
            onClick={createBlog}
            className="rounded-md bg-cyan-600 px-6 py-1 text-gray-100 transition-all duration-200 hover:bg-cyan-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
