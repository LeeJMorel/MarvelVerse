import React from "react";
import "./App.scss";

const VideoDemonstration: React.FC = () => {
  const title = "Video Demonstration";
  const paragraph =
    "Watch this helpful demonstration to learn how to navigate the features of the MarvelVerse and learn more about the rich Social networks.";

  // Replace 'YOUR_YOUTUBE_VIDEO_ID' with the actual ID of your YouTube video
  const youtubeVideoId = "YOUR_YOUTUBE_VIDEO_ID";

  // YouTube embed URL format: https://www.youtube.com/embed/VIDEO_ID
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}`;

  return (
    <div className="app-body writeup">
      <h2>{title}</h2>
      <p>{paragraph}</p>
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src={youtubeEmbedUrl}
          title="YouTube Video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoDemonstration;
