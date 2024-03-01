import React from "react";
import BlogItem from "./BlogItem";

export default function BlogsList(props) {
  return (
    <div className="flex max-w-[50rem] flex-col gap-16 sm:gap-6">
      {props.blogs.map((item) => (
        <div key={item.id}>
          <BlogItem blog={item} />
        </div>
      ))}
    </div>
  );
}
