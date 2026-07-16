import ChannelHeader from "@/components/ChannelHeader";
import Channeltabs from "@/components/ChannelTabs";
import ChannelVideos from "@/components/ChannelVideos";
import VideoUploader from "@/components/VideoUploader";

import { useUser } from "@/context/AuthContext";
import { notFound } from "next/navigation";
import { useRouter } from "next/router";
import React, {Suspense, useEffect, useState} from "react";
import axiosInstance from "@/lib/axiosInstance";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  const { user } = useUser();

  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.get("/video/getall");
    
        setVideos(res.data); // or res.data.videos depending on your API
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex-1 min-h-screen bg-white">
      <ChannelHeader channel={user?.channelname} user={user} />
      <Channeltabs />

      <div className="px-4 pb-8">
        <VideoUploader
          channelId={id as string}
          channelName={user?.channelname}
        />
      </div>

      <div className="px-4 pb-8">
        <ChannelVideos videos={videos} />
      </div>
    </div>
  );
};

export default Index;
