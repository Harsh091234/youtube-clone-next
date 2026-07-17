"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { MoreVertical, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axiosInstance from "@/lib/axiosInstance";
import { user } from "@/constants";
import { useUser } from "@/context/AuthContext";


export default function HistoryContent() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      loadHistory();
    } else {
      setLoading(true);
    }
  }, [user]);

  const loadHistory = async () => {
    if (!user) return;

    try {
      const historyData = await axiosInstance.get(`/history/${user?._id}`);
      setHistory(historyData.data);
    } catch (error) {
      console.error("Error loading history:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div>Loading history...</div>;
  }

  const handleRemoveFromHistory = async (historyId: string) => {
    try {
      console.log("Removing from history:", historyId);

      setHistory(history.filter((item) => item._id !== historyId));
    } catch (error) {
      console.error("Error removing from history:", error);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2">
          Keep track of what you watch
        </h2>
        <p className="text-gray-600">
          Watch history isn't viewable when signed out.
        </p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2">No watch history yet</h2>
        <p className="text-gray-600">Videos you watch will appear here.</p>
      </div>
    );
  }
  
 return (
  <div className="w-full space-y-4">
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-600">{history.length} videos</p>
    </div>

    <div className="space-y-4">
      {history.map((item) => (
        <div
          key={item._id}
          className="group flex flex-col sm:flex-row gap-4 rounded-lg"
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
                Added {formatDistanceToNow(new Date(item.createdAt))} ago
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

  <DropdownMenuContent
    align="end"
    className="w-52"
  >
    <DropdownMenuItem
      onClick={() => handleRemoveFromHistory(item._id)}
      className="cursor-pointer"
    >
      <X className="mr-2 h-4 w-4" />
      <span className="max-w-sm">Remove from watch history</span>
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