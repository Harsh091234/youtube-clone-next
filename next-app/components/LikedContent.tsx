"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { MoreVertical, X, ThumbsUp, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/AuthContext";
import axiosInstance from "@/lib/axiosInstance";
import { user } from "@/constants";

export default function LikedVideosContent() {
  const [likedVideos, setLikedVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      loadLikedVideos();
    }
  }, [user]);

  const loadLikedVideos = async () => {
    if (!user) return;

    try {
      const likedData = await axiosInstance.get(`/like/${user?._id}`);

      setLikedVideos(likedData.data);
    } catch (error) {
      console.error("Error loading liked videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlikeVideo = async (videoId: string, likedVideoId: string) => {
    if (!user) return;

    try {
      console.log("Unliking video:", videoId, "for user:", user._id);
      setLikedVideos(likedVideos.filter((item) => item._id !== likedVideoId));
    } catch (error) {
      console.error("Error unliking video:", error);
    }
  };
  
  if (!user) {
    return (
      <div className="text-center py-12">
        <ThumbsUp className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2">
          Keep track of videos you like
        </h2>
        <p className="text-gray-600">Sign in to see your liked videos.</p>
      </div>
    );
  }

  if (loading) {
    return <div>Loading liked videos...</div>;
  }

  if (likedVideos.length === 0) {
    return (
      <div className="text-center py-12">
        <ThumbsUp className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2">No liked videos yet</h2>
        <p className="text-gray-600">Videos you like will appear here.</p>
      </div>
    );
  }

  return (
  <div className="w-full space-y-4">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-gray-600">
        {likedVideos.length} videos
      </p>

      <Button className="w-full sm:w-fit flex items-center justify-center gap-2">
        <Play className="h-4 w-4" />
        Play all
      </Button>
    </div>

    <div className="space-y-5">
      {likedVideos.map((item) => (
        <div
          key={item._id}
          className="group relative flex flex-col gap-4 sm:flex-row"
        >

          <Link
            href={`/watch/${item.videoid._id}`}
            className="w-full sm:w-56 flex-shrink-0"
          >
            <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
              <video
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL2}/${item.videoid?.filepath}`}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </Link>

    
          <div className="flex flex-1 justify-between gap-3">
            <div className="min-w-0 flex-1">
              <Link href={`/watch/${item.videoid._id}`}>
                <h3 className="mb-1 line-clamp-2 text-sm font-medium hover:text-blue-600 sm:text-base">
                  {item.videoid.videotitle}
                </h3>
              </Link>

              <p className="text-sm text-gray-600">
                {item.videoid.videochanel}
              </p>

              <p className="text-sm text-gray-600">
                {item.videoid.views.toLocaleString()} views •{" "}
                {formatDistanceToNow(new Date(item.videoid.createdAt))} ago
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Liked {formatDistanceToNow(new Date(item.createdAt))} ago
              </p>
            </div>

        
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="
                    h-9 w-9
                    flex-shrink-0
                    self-start
                    opacity-100
                    sm:opacity-0
                    sm:group-hover:opacity-100
                    transition-opacity
                  "
                >
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
  <DropdownMenuItem
    onClick={() => handleUnlikeVideo(item.videoid._id, item._id)}
    className="flex items-start gap-2 whitespace-normal"
  >
    <X className="mt-0.5 h-4 w-4 flex-shrink-0" />
    <span>Remove from liked videos</span>
  </DropdownMenuItem>
</DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}