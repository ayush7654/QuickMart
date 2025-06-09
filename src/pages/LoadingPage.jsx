import { useEffect, useRef } from "react";
import lottie from "lottie-web";

export default function LoadingBird() {
  const container = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("./bird-fly.json"), // replace with your path
    });

    return () => anim.destroy();
  }, []);

  return (
    <div className="loading-screen">
      <div ref={container} style={{ width: 200, height: 200 }} />
    </div>
  );
}
