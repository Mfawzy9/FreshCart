import React from "react";

export default function Title({ mx, my, title }) {
  return (
    <h2
      className={`text-2xl sm:text-4xl relative ${
        mx ?? ""
      } w-fit font-extrabold dark:text-slate-100 text-gray-800 ${my ?? ""} `}
    >
      {title}
      <span className="absolute bottom-0 left-0 right-0 h-1/2 bg-blue-700/55 -z-30"></span>
    </h2>
  );
}
