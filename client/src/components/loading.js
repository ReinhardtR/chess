import React, { useState } from "react";

export default function Loading({ text, ...restProps }) {
  const [label, setLabel] = useState(text);

  setTimeout(() => {
    if (label.length === 3) setLabel("");
    else setLabel(label + ".");
  }, 800);

  return (
    <div className="flex flex-col text-center" {...restProps}>
      <div className="loading-icon w-full h-full" />
      {text}
      {label}
    </div>
  );
}
