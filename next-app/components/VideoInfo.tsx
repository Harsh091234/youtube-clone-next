import  { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Clock,
  Download,
  MoreHorizontal,
  Share,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@/context/AuthContext";
import axiosInstance from "@/lib/axiosInstance";
import CommonDialog from "./CommonDialog";

const VideoInfo = ({ video }: any) => {
  const [likes, setlikes] = useState(video.Like || 0);
  const [dislikes, setDislikes] = useState(video.Dislike || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { user } = useUser();
  const [isWatchLater, setIsWatchLater] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
const [dialogTitle, setDialogTitle] = useState("");
const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    setlikes(video.Like || 0);
    setDislikes(video.Dislike || 0);
    setIsLiked(false);
    setIsDisliked(false);
  }, [video]);


  useEffect(() => {
    const handleviews = async () => {
      if (user) {
        try {
          return await axiosInstance.post(`/history/${video._id}`, {
            userId: user?._id,
          });
        } catch (error) {
          return console.log(error);
        }
      } else {
        return await axiosInstance.post(`/history/views/${video?._id}`);
      }
    };
    handleviews();
  }, [user]);


  const handleLike = async () => {
    if (!user) return;
    try {
      const res = await axiosInstance.post(`/like/${video._id}`, {
        userId: user?._id,
      });
      if (res.data.liked) {
        if (isLiked) {
          setlikes((prev: any) => prev - 1);
          setIsLiked(false);
        } else {
          setlikes((prev: any) => prev + 1);
          setIsLiked(true);
          if (isDisliked) {
            setDislikes((prev: any) => prev - 1);
            setIsDisliked(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleWatchLater = async () => {
    try {
      const res = await axiosInstance.post(`/watch/${video._id}`, {
        userId: user?._id,
      });
      if (res.data.watchlater) {
        setIsWatchLater(!isWatchLater);
      } else {
        setIsWatchLater(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDislike = async () => {
    if (!user) return;
    try {
      const res = await axiosInstance.post(`/like/${video._id}`, {
        userId: user?._id,
      });
      if (!res.data.liked) {
        if (isDisliked) {
          setDislikes((prev: any) => prev - 1);
          setIsDisliked(false);
        } else {
          setDislikes((prev: any) => prev + 1);
          setIsDisliked(true);
          if (isLiked) {
            setlikes((prev: any) => prev - 1);
            setIsLiked(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleDownload = async () => {
   if (!user) {
    setDialogTitle("Login Required");
    setDialogMessage("Please login to download videos.");
    setDialogOpen(true);
    return;
  }
  try {
    const res = await axiosInstance.post("/download", {
      userId: user._id,
      videoId: video._id,
    });

    if (res.data.success) {
      setDialogTitle("Download Started");
      setDialogMessage("Your download has started successfully.");
      setDialogOpen(true);

      const fileUrl = res.data.fileurl;

      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = ""; // browser uses filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (error: any) {
    setDialogTitle("Download Failed");
    setDialogMessage(
      error.response?.data?.message || "Something went wrong."
    );
    setDialogOpen(true);
  }
};


  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">{video.videotitle}</h1>

     <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
  
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
    <div className="flex items-center gap-3">
      <Avatar className="w-10 h-10">
        <AvatarFallback>{video.videochanel[0]}</AvatarFallback>
      </Avatar>

      <div>
        <h3 className="font-medium">{video.videochanel}</h3>
        <p className="text-sm text-gray-600">1.2M subscribers</p>
      </div>
    </div>

    <Button className="w-full sm:w-auto sm:ml-2 lg:ml-4">
      Subscribe
    </Button>
  </div>

  
  <div className="flex flex-wrap items-center gap-2">
  
    <div className="flex items-center bg-gray-100 rounded-full">
      <Button
        variant="ghost"
        size="sm"
        className="rounded-l-full"
        onClick={handleLike}
      >
        <ThumbsUp
          className={`w-5 h-5 mr-2 ${
            isLiked ? "fill-black text-black" : ""
          }`}
        />
        {likes.toLocaleString()}
      </Button>

      <div className="w-px h-6 bg-gray-300" />

      <Button
        variant="ghost"
        size="sm"
        className="rounded-r-full"
        onClick={handleDislike}
      >
        <ThumbsDown
          className={`w-5 h-5 mr-2 ${
            isDisliked ? "fill-black text-black" : ""
          }`}
        />
        {dislikes.toLocaleString()}
      </Button>
    </div>

  
    <Button
      variant="ghost"
      size="sm"
      className={`bg-gray-100 rounded-full ${
        isWatchLater ? "text-primary" : ""
      }`}
      onClick={handleWatchLater}
    >
      <Clock className="w-5 h-5 mr-2" />
      <span className="hidden sm:inline">
        {isWatchLater ? "Saved" : "Watch Later"}
      </span>
    </Button>

  
    <Button
      variant="ghost"
      size="sm"
      className="bg-gray-100 rounded-full"
    >
      <Share className="w-5 h-5 mr-2" />
      <span className="hidden sm:inline">Share</span>
    </Button>

    
    <Button
      variant="ghost"
      size="sm"
      className="bg-gray-100 rounded-full"
       onClick={handleDownload}
    >
      <Download className="w-5 h-5 mr-2" />
      <span className="hidden sm:inline">Download</span>
    </Button>

  
    <Button
      variant="ghost"
      size="icon"
      className="bg-gray-100 rounded-full"
    >
      <MoreHorizontal className="w-5 h-5" />
    </Button>
  </div>
</div>
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="flex gap-4 text-sm font-medium mb-2">
          <span>{video.views.toLocaleString()} views</span>
          <span>{formatDistanceToNow(new Date(video.createdAt))} ago</span>
        </div>
        <div className={`text-sm ${showFullDescription ? "" : "line-clamp-3"}`}>
          <p>
            Sample video description. This would contain the actual video
            description from the database.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 p-0 h-auto font-medium"
          onClick={() => setShowFullDescription(!showFullDescription)}
        >
          {showFullDescription ? "Show less" : "Show more"}
        </Button>
      </div>
      <CommonDialog
  open={dialogOpen}
  onOpenChange={setDialogOpen}
  title={dialogTitle}
  description={dialogMessage}
/>
    </div>
  );
};

export default VideoInfo;