"use client"

import React from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"

import SidebarContent from "./SidebarContent"

interface MobileSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const MobileSidebar = ({ open, onOpenChange }: MobileSidebarProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-0">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
