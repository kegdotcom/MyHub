import React from "react";

interface IconProps {
  name: string;
}

export default function Icon({ name }: IconProps) {
  return <i className={`bi bi-${name}`}></i>;
}
