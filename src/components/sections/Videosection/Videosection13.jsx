import React from "react";
import FullContainer from "@/components/common/FullContainer";
import { IMAGE_BASE } from "@/lib/constants";

function buildVideoSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function isYouTubeUrl(url) {
  if (!url) return false;
  return /youtube\.com|youtu\.be/i.test(url);
}

function toYouTubeEmbedUrl(url) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
    return "";
  } catch {
    return "";
  }
}

export default function Videosection13({ content }) {
  const section = content?.videosection ?? {};
  const rawVideo = section?.file_name || "";
  const videoSrc = buildVideoSrc(IMAGE_BASE, rawVideo);
  const isYouTube = isYouTubeUrl(videoSrc);
  const embedUrl = isYouTube ? toYouTubeEmbedUrl(videoSrc) : "";

  return (
    <FullContainer id="video_section" className="relative h-svh w-full overflow-hidden bg-[#4c2477] md:h-screen">
      {isYouTube && embedUrl ? (
        <iframe
          src={`${embedUrl}?autoplay=1&mute=1&loop=1&playlist=${embedUrl.split("/embed/")[1] ?? ""}&controls=0&rel=0&modestbranding=1`}
          title="Video"
          className="h-full w-full"
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : videoSrc ? (
        <video
          src={videoSrc}
          className="h-full w-full object-contain md:object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : null}
    </FullContainer>
  );
}