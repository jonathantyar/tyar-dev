'use client'

import { useState } from "react";

export default function CursorBackground() {
  const [highlightPosition, setHighlightPosition] = useState({ x: 0, y: 0 });
  const onMouseMove = (e: any) => {
    let rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    setHighlightPosition({
      x, y
    })
  };
  const backgroundStyle = {
    background: `radial-gradient(600px at ${highlightPosition.x}px ${highlightPosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
  };

  return (
    <div
      onMouseMove={onMouseMove}
      className="pointer-events-none lg:pointer-events-auto fixed inset-1 z-0 transition duration-300 lg:absolute"
      style={backgroundStyle}
    />
  )
}