import ChannelHeader from "@/components/ChannelHeader";
import Channeltabs from "@/components/ChannelTabs";
import ChannelVideos from "@/components/ChannelVideos";
import VideoUploader from "@/components/VideoUploader";
import { channel } from "diagnostics_channel";
import { useUser } from "@/context/AuthContext";
import { notFound } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();

  try {
    let channel = user;
   
    
    return (
      <div className="flex-1 min-h-screen bg-white">
        <div className="max-w-full mx-auto">
          <ChannelHeader channel={channel} user={user} />
          <Channeltabs />
          <div className="px-4 pb-8">
            <VideoUploader channelId={id} channelName={channel?.channelname} />
          </div>
          <div className="px-4 pb-8">
            <ChannelVideos  />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching channel data:", error);
   
  }
};

export default index;