import React, { useRef, useEffect } from 'react';

export function ActiveVideoPlayer({ src, poster }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      className="category-video"
    />
  );
}