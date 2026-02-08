"use client"

import { useState, useEffect } from "react"

interface MenuBarProps {
  onJacksongioClick?: () => void
  onFileClick?: () => void
  onEditClick?: () => void
  onSpecialClick?: () => void
}

export function MenuBar({ onJacksongioClick, onFileClick, onEditClick, onSpecialClick }: MenuBarProps) {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-[36px] flex items-center justify-between bg-card border-b-2 border-border px-3 flex-shrink-0 z-50">
      <div className="flex items-center gap-2 md:gap-4 min-w-0">
        <button 
          onClick={onJacksongioClick}
          className="font-bold text-sm md:text-lg border border-border px-1 md:px-2 bg-secondary text-card-foreground hover:bg-primary hover:text-primary-foreground cursor-pointer whitespace-nowrap"
        >
          Jacksongio
        </button>
        <button 
          onClick={onFileClick}
          className="text-sm md:text-base text-card-foreground hover:bg-primary hover:text-primary-foreground px-1 md:px-2 cursor-pointer bg-transparent border-none whitespace-nowrap"
        >
          File
        </button>
        <button 
          onClick={onEditClick}
          className="text-sm md:text-base text-card-foreground hover:bg-primary hover:text-primary-foreground px-1 md:px-2 cursor-pointer bg-transparent border-none whitespace-nowrap"
        >
          Edit
        </button>
        <button 
          onClick={onSpecialClick}
          className="text-sm md:text-base text-card-foreground hover:bg-primary hover:text-primary-foreground px-1 md:px-2 cursor-pointer bg-transparent border-none whitespace-nowrap"
        >
          Special
        </button>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-card-foreground text-sm md:text-lg">{time}</span>
      </div>
    </div>
  )
}
