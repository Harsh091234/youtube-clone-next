"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Compass,
  Clock,
  History,
  Home,
  PlaySquare,
  ThumbsUp,
  User,
} from "lucide-react"

import { Button } from "./ui/button"
import Channeldialogue from "./ChannelDialogue"

// import { useUser } from "@/lib/AuthContext"

const SidebarContent = () => {
  // const { user } = useUser();

  const user: any = {
    id: "66a8f2d91b2c4f3a9d8e7f11",
    channelName: "Harsh Sharma",
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <nav className="space-y-1 p-2">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-3 h-5 w-5" />
            Home
          </Button>
        </Link>

        <Link href="/explore">
          <Button variant="ghost" className="w-full justify-start">
            <Compass className="mr-3 h-5 w-5" />
            Explore
          </Button>
        </Link>

        <Link href="/subscriptions">
          <Button variant="ghost" className="w-full justify-start">
            <PlaySquare className="mr-3 h-5 w-5" />
            Subscriptions
          </Button>
        </Link>

        {user && (
          <div className="mt-2 border-t pt-2">
            <Link href="/history">
              <Button variant="ghost" className="w-full justify-start">
                <History className="mr-3 h-5 w-5" />
                History
              </Button>
            </Link>

            <Link href="/liked">
              <Button variant="ghost" className="w-full justify-start">
                <ThumbsUp className="mr-3 h-5 w-5" />
                Liked videos
              </Button>
            </Link>

            <Link href="/watch-later">
              <Button variant="ghost" className="w-full justify-start">
                <Clock className="mr-3 h-5 w-5" />
                Watch later
              </Button>
            </Link>

            {user.channelName ? (
              <Link href={`/channel/${user.id}`}>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-3 h-5 w-5" />
                  Your channel
                </Button>
              </Link>
            ) : (
              <div className="px-2 py-2">
                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Create Channel
                </Button>
              </div>
            )}
          </div>
        )}
      </nav>

      <Channeldialogue
        isopen={isDialogOpen}
        onclose={() => setIsDialogOpen(false)}
        mode="create"
      />
    </>
  )
}

export default SidebarContent
