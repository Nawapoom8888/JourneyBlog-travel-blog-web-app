import React from "react";

export default function BodyWrapper(props) {
  return (
    <div className="border-test relative px-6 pb-12 pt-8">
      <div className="border-test mx-auto flex max-w-5xl flex-col rounded-2xl bg-white p-6 shadow-lg">
        {props.children}
      </div>
    </div>
  );
}
