import React from "react";

export default function ServerList({ children, ...restProps }) {
  return <div {...restProps}>{children}</div>;
}
