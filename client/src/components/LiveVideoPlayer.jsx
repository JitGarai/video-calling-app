import React, { useRef, useEffect, } from "react";

const LiveVideoPlayer = ({ stream, muted }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted={muted}
      style={{ width: "300px", borderRadius: "8px" }}
    />
  );
};


export default LiveVideoPlayer;
