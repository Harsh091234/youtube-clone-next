"use client"

import React from "react"
import SidebarContent from "./SidebarContent"

const Sidebar = () => {
  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-56px)] w-64 overflow-y-auto border-r bg-white lg:block">
      <SidebarContent />
    </aside>
  )
}

export default Sidebar
