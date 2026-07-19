import React, { useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

const ChannelHeader = ({ channel, user }: any) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  return (
    <div className="w-full">
      {/* Banner */}
      <div className="relative h-32 md:h-48 lg:h-64 bg-gradient-to-r from-blue-400 to-purple-500 overflow-hidden"></div>

      {/* Channel Info */}
      <div className="px-4 py-6">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 ">
  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full">
    <Avatar className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 flex-shrink-0">
      <AvatarFallback className="text-lg text-center">
        {user?.channelname}
      </AvatarFallback>
    </Avatar>

    <div className="flex-1 space-y-2 text-center sm:text-left">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold break-words">
        {user?.channelname}
      </h1>

      <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-600">
        <span>
          @{user?.channelname.toLowerCase().replace(/\s+/g, "")}
        </span>
      </div>

      {user?.description && (
        <p className="text-sm text-gray-700 max-w-2xl">
          {user?.description}
        </p>
      )}
    </div>
  </div>

  {user && user?._id !== channel?._id && (
    <div className="w-full sm:w-auto sm:ml-auto">
      <Button
        onClick={() => setIsSubscribed(!isSubscribed)}
        variant={isSubscribed ? "outline" : "default"}
        className={`w-full sm:w-auto px-6 ${
          isSubscribed
            ? "bg-gray-100"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {isSubscribed ? "Subscribed" : "Subscribe"}
      </Button>
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default ChannelHeader;