import React from "react";

export default function Button({
  extraClass = "bg-primary-gradient",
  handleClick,
  children,
  ...restProps
}) {
  return (
    <button
      onClick={handleClick}
      {...restProps}
      className={`${extraClass} text-white font-medium rounded-full w-auto cursor-pointer p-4 transform transition hover:scale-110 focus:outline-none focus:ring focus:ring-secondary shadow-2xl`}
    >
      {children}
    </button>
  );
}
