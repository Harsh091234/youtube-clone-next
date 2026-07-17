"use client";

import { useRef, useEffect } from "react";

interface VideoPlayerProps {
  video: {
    _id: string;
    videotitle: string;
    filepath: string;
  };
}

export default function VideoPlayer({ video }: VideoPlayerProps) {

 
  
  if(!video) return
  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden">
      <video
        
        className="w-full h-full"
        controls
      src={`${process.env.NEXT_PUBLIC_BACKEND_URL2}/${video?.filepath}`}
      />
      
      
    </div>
  );
}