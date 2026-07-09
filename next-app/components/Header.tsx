  "use client"

  import { Bell, Menu, Mic, Search, User, VideoIcon } from "lucide-react"
  import React, { useState } from "react"
  import { Button } from "./ui/button"
  import Link from "next/link"
  import { Input } from "./ui/input"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "./ui/dropdown-menu"
  import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
  import Channeldialogue from "./ChannelDialogue"
  import { useRouter } from "next/navigation"
  import MobileSidebar from "./MobileSidebar"
import Sidebar from "./Sidebar"
  // import { useUser } from "@/lib/AuthContext"

  const Header = () => {
    //   const { user, logout, handlegooglesignin } = useUser()
    const user: any = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      image: "https://github.com/shadcn.png?height=32&width=32",
    }

    const handlegooglesignin = () => {}
    const logout = () => {}
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isdialogeopen, setisdialogeopen] = useState(false)
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault()
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      }
    }
    const handleKeypress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch(e as any)
      }
    }

    const onMenuClick = () => {
      setSidebarOpen(true);
    }
    return (
      <>
        <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-white px-2 sm:px-4">
          {" "}
          {/* Left */}
          <div className="flex items-center gap-1 sm:gap-4">
            <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>

            <Link href="/" className="flex items-center gap-1 sm:gap-4">
              <div className="rounded bg-red-600 p-1">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>

              <span className="hidden text-xl font-medium sm:block">YouTube</span>

              <span className="hidden text-xs text-gray-400 lg:block">IN</span>
            </Link>
          </div>
          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="mx-6 hidden max-w-2xl flex-1 items-center gap-3 md:flex"
          >
            <div className="flex flex-1">
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-l-full border-r-0 focus-visible:ring-0"
              />

              <Button
                type="submit"
                className="rounded-r-full border border-l-0 bg-gray-100 px-6 text-black hover:bg-gray-200"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>

            <Button variant="ghost" size="icon" className="rounded-full">
              <Mic className="h-5 w-5" />
            </Button>
          </form>
          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => {
                if (searchQuery.trim()) {
                  router.push(
                    `/search?q=${encodeURIComponent(searchQuery.trim())}`
                  )
                } else {
                  router.push("/search")
                }
              }}
            >
              <Search className="h-5 w-5" />
            </Button>

            {user ? (
              <>
                <Button variant="ghost" size="icon" className="hidden lg:flex">
                  <VideoIcon className="h-5 w-5" />
                </Button>

                <Button variant="ghost" size="icon" className="hidden lg:flex">
                  <Bell className="h-5 w-5" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full p-0"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image} />
                        <AvatarFallback>{user.name?.[0] ?? "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-56">
                    {user.channelname ? (
                      <DropdownMenuItem asChild>
                        <Link href={`/channel/${user._id}`}>Your Channel</Link>
                      </DropdownMenuItem>
                    ) : (
                      <div className="p-2">
                        <Button
                          className="w-full"
                          size="sm"
                          variant="secondary"
                          onClick={() => setisdialogeopen(true)}
                        >
                          Create Channel
                        </Button>
                      </div>
                    )}

                    <DropdownMenuItem asChild>
                      <Link href="/history">History</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/liked">Liked videos</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/watch-later">Watch later</Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button
                onClick={handlegooglesignin}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Sign in</span>
              </Button>
            )}
          </div>
        </header>

        <Channeldialogue
          isopen={isdialogeopen}
          onclose={() => setisdialogeopen(false)}
          mode="create"
        />
        <MobileSidebar
        open={sidebarOpen}
        onOpenChange={() => setSidebarOpen(false)}
        />
      
      </>
    )
  }

  export default Header
