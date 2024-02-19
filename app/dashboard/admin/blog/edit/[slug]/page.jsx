"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function AdminBlogUpdate({ params }) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    getBlog();
  }, [params]);

  async function getBlog() {
    try {
      const response = await fetch(`${process.env.API}/blog/${params.slug}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setId(data._id);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setImage(data.image);
      setPreview(data.image);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  }

  // cloudinary - click on settings icon > preset > unsigned
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET); // replace with your upload_preset

      // upload to cloudinary
      try {
        const response = await fetch(process.env.CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          setImage(data.secure_url);
        } else {
          console.log("Image upload failed");
        }
      } catch (err) {
        console.log("Error uploading image:", err);
      }
      setLoading(false);
    }
  };

  const updateBlog = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          category,
          image,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update blog");
      }
      // router.back();
      window.location.href = "/dashboard/admin";
      toast.success("Blog updated successfully");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    }
  };

  const handleDelete = async () => {
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
      window.location.href = "/dashboard/admin/blog/list";
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="w-[20rem] sm:w-[30rem] md:w-[50rem]">
      <h1 className="text-xl font-semibold">Update Blog</h1>
      <br />
      <div className="flex flex-col justify-between gap-5">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="mb-4 h-[18rem] w-full">
            {image && (
              <div
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="h-full w-full"
              ></div>
            )}
          </div>

          <div className="border-test w-full">
            <div className="border-test">
              <div className="mb-2 inline-block">
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

        <div className="flex w-full justify-center gap-5">
          <button
            onClick={updateBlog}
            className="rounded-md bg-cyan-600 px-6 py-1 text-gray-100 transition-all duration-200 hover:bg-cyan-700"
          >
            Update
          </button>
          <button
            disabled={loading}
            onClick={handleDelete}
            className="rounded-md bg-red-600 px-6 py-1 text-gray-100 transition-all duration-200 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
