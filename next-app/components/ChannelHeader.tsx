import React, { useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Settings } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
];


const ChannelHeader = ({channelId, channel, user, preferredLanguage }: any) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [channelName, setChannelName] = useState(
  user?.channelname || ""
);

const [description, setDescription] = useState(
  user?.description || ""
);
const [language, setLanguage] = useState(
  preferredLanguage || "en"
);

const updateChannel = async () => {
  try {
    setSaving(true);

    await axiosInstance.patch(
      `/user/update/${user._id}`,
      {
        preferredLanguage: language
      }
    );

    setOpenSettings(false);

  } catch(error) {
    console.log(error);
  } finally {
    setSaving(false);
  }
};
const [saving, setSaving] = useState(false);
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
      <div className="flex items-center gap-3">

  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold break-words">
    {user?.channelname}
  </h1>

  {user?._id.toString() === channelId.toString() && (
    <button
      onClick={() => setOpenSettings(true)}
      className="p-2 rounded-full hover:bg-gray-100"
    >
      <Settings size={22} />
    </button>
  )}

</div>
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

  {openSettings && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Channel Settings
        </h2>

        <button
          onClick={() => setOpenSettings(false)}
          className="rounded-full p-2 hover:bg-gray-100"
        >
          ✕
        </button>
      </div>


      <div className="space-y-4">

        <div>
          <label className="text-sm font-medium">
            Channel Name
          </label>

          <input
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="mt-1 w-full rounded-md border p-2"
            placeholder="Enter channel name"
          />
        </div>


        <div>
          <label className="text-sm font-medium">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-md border p-2"
            placeholder="Enter channel description"
            rows={4}
          />
        </div>


        <div>
          <label className="text-sm font-medium">
            Preferred Language
          </label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-1 w-full rounded-md border p-2"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>


        <Button
          onClick={updateChannel}
          disabled={saving}
          className="w-full"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>

      </div>

    </div>

  </div>
)}
</div>
      </div>
     
    </div>
  );
};

export default ChannelHeader;