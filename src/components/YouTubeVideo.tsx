import React from "react";
import YouTube from "react-youtube";

export const YouTubeVideo = () => {
  return (
    <div
      style={{
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <YouTube
        videoId="ePDD8q2HZL8"
        opts={{
          height: "1080",
          width: "1920",
          playerVars: {
            autoplay: 1,
            loop: 1,
            controls: 0,
            modestbranding: 1,
          },
        }}
        onReady={(e) => {
          e.target.mute();
        }}
      />
    </div>
  );
};
