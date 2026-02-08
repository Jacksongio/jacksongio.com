"use client"

import { useState, useCallback, useEffect } from "react"
import { MenuBar } from "@/components/menu-bar"
import { DesktopIcon } from "@/components/desktop-icon"
import { MacWindow } from "@/components/mac-window"
import { StyleEditor } from "@/components/style-editor"
import { FlyingToasters } from "@/components/flying-toasters"
import { FileManager } from "@/components/file-manager"
import { SystemInfo } from "@/components/system-info"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

type WindowId = "about" | "help" | "styleEditor" | "fileManager" | "systemInfo"

// Pixel art style icons as SVG
function AboutIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <rect x="4" y="4" width="24" height="24" fill="#c0c0c0" stroke="#000" strokeWidth="2" />
      <circle cx="16" cy="12" r="3" fill="#000080" />
      <rect x="14" y="17" width="4" height="8" fill="#000080" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <rect x="8" y="8" width="16" height="20" fill="#c0c0c0" stroke="#000" strokeWidth="2" />
      <rect x="6" y="6" width="20" height="4" fill="#808080" stroke="#000" strokeWidth="1" />
      <line x1="12" y1="12" x2="12" y2="24" stroke="#000" strokeWidth="2" />
      <line x1="16" y1="12" x2="16" y2="24" stroke="#000" strokeWidth="2" />
      <line x1="20" y1="12" x2="20" y2="24" stroke="#000" strokeWidth="2" />
    </svg>
  )
}

function HelpIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <rect x="4" y="4" width="24" height="24" fill="#ffff00" stroke="#000" strokeWidth="2" />
      <text x="16" y="22" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#000">?</text>
    </svg>
  )
}

// Easter Egg Icons
function FloppyIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <rect x="4" y="2" width="24" height="28" fill="#1e40af" stroke="#000" strokeWidth="2" />
      <rect x="8" y="2" width="14" height="10" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
      <rect x="10" y="4" width="8" height="6" fill="#404040" />
      <rect x="8" y="18" width="16" height="10" fill="#f0f0f0" stroke="#000" strokeWidth="1" />
      <rect x="10" y="20" width="12" height="2" fill="#808080" />
      <rect x="10" y="24" width="8" height="2" fill="#808080" />
    </svg>
  )
}

function ToasterIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <rect x="4" y="10" width="24" height="16" rx="2" fill="#c0c0c0" stroke="#000" strokeWidth="2" />
      <rect x="8" y="6" width="6" height="8" fill="#d4a574" stroke="#000" strokeWidth="1" />
      <rect x="18" y="6" width="6" height="8" fill="#d4a574" stroke="#000" strokeWidth="1" />
      <rect x="10" y="8" width="2" height="4" fill="#8b6914" />
      <rect x="20" y="8" width="2" height="4" fill="#8b6914" />
      <circle cx="24" cy="18" r="2" fill="#ff0000" />
    </svg>
  )
}

function BombIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <circle cx="16" cy="18" r="10" fill="#000" />
      <rect x="14" y="4" width="4" height="8" fill="#808080" />
      <path d="M18 6 L24 2 L22 6 L26 4" stroke="#ff6600" strokeWidth="2" fill="none" />
      <ellipse cx="12" cy="14" rx="3" ry="2" fill="#404040" />
    </svg>
  )
}

function SadMacIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <rect x="4" y="2" width="24" height="28" rx="2" fill="#f0f0f0" stroke="#000" strokeWidth="2" />
      <rect x="8" y="6" width="16" height="12" fill="#000" />
      <rect x="10" y="8" width="4" height="3" fill="#fff" />
      <rect x="18" y="8" width="4" height="3" fill="#fff" />
      <path d="M12 14 Q16 12 20 14" stroke="#fff" strokeWidth="1" fill="none" />
      <rect x="10" y="22" width="12" height="4" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
    </svg>
  )
}

function ResumeIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <rect x="6" y="2" width="20" height="28" fill="#fff" stroke="#000" strokeWidth="2" />
      <rect x="8" y="4" width="16" height="2" fill="#000" />
      <rect x="8" y="8" width="16" height="1" fill="#808080" />
      <rect x="8" y="11" width="12" height="1" fill="#808080" />
      <rect x="8" y="14" width="16" height="1" fill="#808080" />
      <rect x="8" y="17" width="10" height="1" fill="#808080" />
      <rect x="8" y="20" width="14" height="1" fill="#808080" />
      <rect x="8" y="23" width="8" height="1" fill="#808080" />
    </svg>
  )
}

function CoffeeIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <rect x="6" y="10" width="16" height="18" fill="#fff" stroke="#000" strokeWidth="2" />
      <path d="M22 14 Q28 14 28 20 Q28 26 22 26" stroke="#000" strokeWidth="2" fill="none" />
      <rect x="8" y="12" width="12" height="8" fill="#6b4423" />
      <path d="M10 6 Q12 2 14 6" stroke="#808080" strokeWidth="1" fill="none" />
      <path d="M14 4 Q16 0 18 4" stroke="#808080" strokeWidth="1" fill="none" />
    </svg>
  )
}

export default function Home() {
  const isMobile = useIsMobile()
  const [showAbout, setShowAbout] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showStyleEditor, setShowStyleEditor] = useState(false)
  const [showScreensaver, setShowScreensaver] = useState(false)
  const [showFileManager, setShowFileManager] = useState(false)
  const [showSystemInfo, setShowSystemInfo] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [windowOrder, setWindowOrder] = useState<WindowId[]>(["about", "help", "styleEditor", "fileManager", "systemInfo"])
  const [rightSideX, setRightSideX] = useState(1200)
  const [trashPosition, setTrashPosition] = useState({ x: 1200, y: 600 })
  const [bottomLeftPositions, setBottomLeftPositions] = useState({ 
    about: { x: 8, y: 600 }, 
    help: { x: 98, y: 600 } 
  })
  
  // Helper function to snap to grid (same logic as in DesktopIcon)
  const snapToGrid = useCallback((x: number, y: number) => {
    const GRID_SIZE_X = 90
    const GRID_SIZE_Y = 84
    const GRID_OFFSET_X = 8
    const GRID_OFFSET_Y = 8
    const gridX = Math.round((x - GRID_OFFSET_X) / GRID_SIZE_X)
    const gridY = Math.round((y - GRID_OFFSET_Y) / GRID_SIZE_Y)
    return {
      x: Math.max(0, gridX) * GRID_SIZE_X + GRID_OFFSET_X,
      y: Math.max(0, gridY) * GRID_SIZE_Y + GRID_OFFSET_Y
    }
  }, [])
  
  // Initialize icon positions with their snapped initial positions
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>(() => ({
    // URL icons - top left in 3 columns
    // Row 1
    arcan: snapToGrid(16, 16),
    giogpt: snapToGrid(98, 16),
    fogreport: snapToGrid(188, 16),
    // Row 2
    gioprompt: snapToGrid(16, 100),
    jacksongiordano: snapToGrid(98, 100),
    thegiordanos: snapToGrid(188, 100),
    // Row 3
    whitewineandclaret: snapToGrid(16, 184),
    bored: snapToGrid(98, 184),
    resume: snapToGrid(188, 184),
  }))

  useEffect(() => {
    const updatePositions = () => {
      // Set right side icon positions for easter eggs in 3-column grid
      const newRightX = window.innerWidth - 100
      const newRightX2 = window.innerWidth - 190
      const newRightX3 = window.innerWidth - 280
      
      // Trash in bottom right
      const newTrashPos = { x: window.innerWidth - 100, y: window.innerHeight - 150 }
      
      // About and Help in bottom left - one spot above the footer
      const newAboutPos = { x: 8, y: window.innerHeight - 150 } // Same as trash height
      const newHelpPos = { x: 98, y: window.innerHeight - 150 }
      
      setRightSideX(newRightX)
      setTrashPosition(newTrashPos)
      setBottomLeftPositions({
        about: newAboutPos,
        help: newHelpPos
      })
      
      // Also register their positions in the icon positions map
      setIconPositions(prev => ({
        ...prev,
        // Easter eggs - top right in 3-column grid
        // Row 1
        coffee: snapToGrid(newRightX3, 16),
        toaster: snapToGrid(newRightX2, 16),
        floppy: snapToGrid(newRightX, 16),
        // Row 2
        sadmac: snapToGrid(newRightX2, 100),
        bomb: snapToGrid(newRightX, 100),
        // Trash - bottom right
        trash: snapToGrid(newTrashPos.x, newTrashPos.y),
        // About and Help - bottom left
        about: snapToGrid(newAboutPos.x, newAboutPos.y),
        help: snapToGrid(newHelpPos.x, newHelpPos.y),
      }))
    }

    // Initial positioning
    updatePositions()

    // Add resize listener for responsive behavior
    window.addEventListener('resize', updatePositions)
    
    return () => {
      window.removeEventListener('resize', updatePositions)
    }
  }, [snapToGrid])

  const bringToFront = useCallback((windowId: WindowId) => {
    setWindowOrder(prev => {
      const filtered = prev.filter(id => id !== windowId)
      return [...filtered, windowId]
    })
  }, [])

  const getZIndex = (windowId: WindowId) => {
    return windowOrder.indexOf(windowId) + 10
  }

  const handleIconPositionChange = useCallback((iconId: string, position: { x: number; y: number }) => {
    setIconPositions(prev => ({
      ...prev,
      [iconId]: position
    }))
  }, [])

  return (
    <div className="h-screen w-screen flex flex-col bg-background">
      {/* Menu Bar - Fixed height */}
      <MenuBar 
        onJacksongioClick={() => {
          setShowSystemInfo(true)
          bringToFront("systemInfo")
        }}
        onFileClick={() => {
          setShowFileManager(true)
          bringToFront("fileManager")
        }}
        onEditClick={() => {
          setShowStyleEditor(true)
          bringToFront("styleEditor")
        }}
        onSpecialClick={() => setShowScreensaver(true)}
      />

      {/* Desktop Area - Fills remaining space */}
      <main className={cn(
        "flex-1 min-h-0",
        isMobile ? "overflow-y-auto p-3" : "relative p-4 overflow-hidden"
      )}>
        {/* Background Logo - desktop only */}
        {!isMobile && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img 
              src="/gioprompt.png" 
              alt="Jacksongio Logo" 
              className="max-w-[40%] max-h-[40%] object-contain"
            />
          </div>
        )}

        {/* === Projects Section === */}
        {isMobile && (
          <p className="text-[11px] uppercase tracking-widest text-white font-semibold mb-1.5 px-1 border-b border-border/50 pb-1">Projects</p>
        )}
        <div className={cn(isMobile && "grid grid-cols-4 gap-0.5 justify-items-center mb-4")}>
          <DesktopIcon
            icon={<img src="/logos/arcan.png" alt="ArcanAI" className="w-full h-full object-contain" />}
            label="ArcanAI"
            selected={selectedIcon === "arcan"}
            onClick={() => setSelectedIcon("arcan")}
            onDoubleClick={() => {
              setSelectedIcon("arcan")
              window.open("https://apps.apple.com/us/app/arcanai/id6755493224", "_blank")
            }}
            initialPosition={{ x: 16, y: 16 }}
            iconId="arcan"
            occupiedPositions={iconPositions}
            onPositionChange={handleIconPositionChange}
          />
          <DesktopIcon
            icon={<img src="/logos/giogpt.png" alt="GioGPT" className="w-full h-full object-contain" />}
            label="GioGPT"
            selected={selectedIcon === "giogpt"}
            onClick={() => setSelectedIcon("giogpt")}
            onDoubleClick={() => {
              setSelectedIcon("giogpt")
              window.open("https://giogpt.com", "_blank")
            }}
            initialPosition={{ x: 98, y: 16 }}
            iconId="giogpt"
            occupiedPositions={iconPositions}
            onPositionChange={handleIconPositionChange}
          />
          <DesktopIcon
            icon={<img src="/logos/fogreport.png" alt="Fog Report" className="w-full h-full object-contain" />}
            label="Fog Report"
            selected={selectedIcon === "fogreport"}
            onClick={() => setSelectedIcon("fogreport")}
            onDoubleClick={() => {
              setSelectedIcon("fogreport")
              window.open("https://fogreport.io", "_blank")
            }}
            initialPosition={{ x: 188, y: 16 }}
            iconId="fogreport"
            occupiedPositions={iconPositions}
            onPositionChange={handleIconPositionChange}
          />
          <DesktopIcon
            icon={<img src="/logos/gioprompt.png" alt="GioPrompt" className="w-full h-full object-contain" />}
            label="GioPrompt"
            selected={selectedIcon === "gioprompt"}
            onClick={() => setSelectedIcon("gioprompt")}
            onDoubleClick={() => {
              setSelectedIcon("gioprompt")
              window.open("https://gioprompt.com", "_blank")
            }}
            initialPosition={{ x: 16, y: 100 }}
            iconId="gioprompt"
            occupiedPositions={iconPositions}
            onPositionChange={handleIconPositionChange}
          />
          <DesktopIcon
            icon={<img src="/logos/jacksongiordano.png" alt="Jackson Giordano" className="w-full h-full object-contain" />}
            label="JacksonGio"
            selected={selectedIcon === "jacksongiordano"}
            onClick={() => setSelectedIcon("jacksongiordano")}
            onDoubleClick={() => {
              setSelectedIcon("jacksongiordano")
              window.open("https://jacksongiordano.com", "_blank")
            }}
            initialPosition={{ x: 98, y: 100 }}
            iconId="jacksongiordano"
            occupiedPositions={iconPositions}
            onPositionChange={handleIconPositionChange}
          />
          <DesktopIcon
            icon={<img src="/logos/thegiordanos.png" alt="The Giordanos" className="w-full h-full object-contain" />}
            label="Giordanos"
            selected={selectedIcon === "thegiordanos"}
            onClick={() => setSelectedIcon("thegiordanos")}
            onDoubleClick={() => {
              setSelectedIcon("thegiordanos")
              window.open("https://thegiordanos.net", "_blank")
            }}
            initialPosition={{ x: 188, y: 100 }}
            iconId="thegiordanos"
            occupiedPositions={iconPositions}
            onPositionChange={handleIconPositionChange}
          />
          <DesktopIcon
            icon={<img src="/logos/Whitewineandclaret.png" alt="White Wine and Claret" className="w-full h-full object-contain" />}
            label="Wine Blog"
            selected={selectedIcon === "whitewineandclaret"}
            onClick={() => setSelectedIcon("whitewineandclaret")}
            onDoubleClick={() => {
              setSelectedIcon("whitewineandclaret")
              window.open("https://whitewineandclaret.com", "_blank")
            }}
            initialPosition={{ x: 16, y: 184 }}
            iconId="whitewineandclaret"
            occupiedPositions={iconPositions}
            onPositionChange={handleIconPositionChange}
          />
          <DesktopIcon
            icon={<img src="/logos/bored.png" alt="Jackson is Bored" className="w-full h-full object-contain" />}
            label="Bored"
            selected={selectedIcon === "bored"}
            onClick={() => setSelectedIcon("bored")}
            onDoubleClick={() => {
              setSelectedIcon("bored")
              window.open("https://jacksonisreallybored.xyz", "_blank")
            }}
            initialPosition={{ x: 98, y: 184 }}
            iconId="bored"
            occupiedPositions={iconPositions}
            onPositionChange={handleIconPositionChange}
          />
          <DesktopIcon
            icon={<ResumeIcon />}
            label="Resume"
            selected={selectedIcon === "resume"}
            onClick={() => setSelectedIcon("resume")}
            onDoubleClick={() => {
              setSelectedIcon("resume")
              window.open("https://github.com/Jacksongio/resume/blob/main/resume.pdf", "_blank")
            }}
            initialPosition={{ x: 188, y: 184 }}
            iconId="resume"
            occupiedPositions={iconPositions}
            onPositionChange={handleIconPositionChange}
          />
        </div>

        {/* === System Section === */}
        {isMobile && (
          <p className="text-[11px] uppercase tracking-widest text-white font-semibold mb-1.5 px-1 border-b border-border/50 pb-1">System</p>
        )}
        <div className={cn(isMobile && "grid grid-cols-4 gap-0.5 justify-items-center mb-4")}>
          <DesktopIcon
            icon={<AboutIcon />}
            label="About"
            selected={selectedIcon === "about"}
            onClick={() => setSelectedIcon("about")}
            onDoubleClick={() => {
              setSelectedIcon("about")
              setShowAbout(true)
              bringToFront("about")
            }}
            initialPosition={bottomLeftPositions.about}
            iconId="about"
            occupiedPositions={iconPositions}
            onPositionChange={handleIconPositionChange}
          />
          <DesktopIcon
            icon={<HelpIcon />}
            label="Help"
            selected={selectedIcon === "help"}
            onClick={() => setSelectedIcon("help")}
            onDoubleClick={() => {
              setSelectedIcon("help")
              setShowHelp(true)
              bringToFront("help")
            }}
            initialPosition={bottomLeftPositions.help}
            iconId="help"
            occupiedPositions={iconPositions}
            onPositionChange={handleIconPositionChange}
          />
        </div>

        {/* === Easter Eggs Section === */}
        {isMobile && (
          <p className="text-[11px] uppercase tracking-widest text-white font-semibold mb-1.5 px-1 border-b border-border/50 pb-1">Easter Eggs</p>
        )}
        <div className={cn(isMobile && "grid grid-cols-4 gap-0.5 justify-items-center mb-4")}>
          <DesktopIcon
            icon={<CoffeeIcon />}
            label="Coffee Break"
            selected={selectedIcon === "coffee"}
            onClick={() => setSelectedIcon("coffee")}
            onDoubleClick={() => {
              setSelectedIcon("coffee")
              document.body.style.filter = "sepia(0.5) brightness(1.1)"
              setTimeout(() => {
                document.body.style.filter = ""
              }, 2000)
            }}
            initialPosition={{ x: rightSideX - 180, y: 16 }}
            iconId="coffee"
            occupiedPositions={iconPositions}
            onPositionChange={handleIconPositionChange}
          />
          <DesktopIcon
            icon={<ToasterIcon />}
            label="Toaster.app"
            selected={selectedIcon === "toaster"}
            onClick={() => setSelectedIcon("toaster")}
            onDoubleClick={() => {
              setSelectedIcon("toaster")
              setShowScreensaver(true)
            }}
            initialPosition={{ x: rightSideX - 90, y: 16 }}
            iconId="toaster"
            occupiedPositions={iconPositions}
            onPositionChange={handleIconPositionChange}
          />
          <DesktopIcon
            icon={<FloppyIcon />}
            label="secrets.dat"
            selected={selectedIcon === "floppy"}
            onClick={() => setSelectedIcon("floppy")}
            onDoubleClick={() => {
              setSelectedIcon("floppy")
              alert("[ DATA CORRUPTED ]\n\nJust kidding! Thanks for exploring.")
            }}
            initialPosition={{ x: rightSideX, y: 16 }}
            iconId="floppy"
            occupiedPositions={iconPositions}
            onPositionChange={handleIconPositionChange}
          />
          <DesktopIcon
            icon={<SadMacIcon />}
            label="System 404"
            selected={selectedIcon === "sadmac"}
            onClick={() => setSelectedIcon("sadmac")}
            onDoubleClick={() => {
              setSelectedIcon("sadmac")
              const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"]
              let i = 0
              const interval = setInterval(() => {
                document.body.style.backgroundColor = colors[i % colors.length]
                i++
                if (i > 10) {
                  clearInterval(interval)
                  document.body.style.backgroundColor = ""
                }
              }, 100)
            }}
            initialPosition={{ x: rightSideX - 90, y: 100 }}
            iconId="sadmac"
            occupiedPositions={iconPositions}
            onPositionChange={handleIconPositionChange}
          />
          <DesktopIcon
            icon={<BombIcon />}
            label="dont_click"
            selected={selectedIcon === "bomb"}
            onClick={() => setSelectedIcon("bomb")}
            onDoubleClick={() => {
              setSelectedIcon("bomb")
              const el = document.documentElement
              el.style.transition = "transform 0.5s"
              el.style.transform = "rotate(2deg)"
              setTimeout(() => {
                el.style.transform = "rotate(-2deg)"
              }, 500)
              setTimeout(() => {
                el.style.transform = "rotate(0deg)"
              }, 1000)
            }}
            initialPosition={{ x: rightSideX, y: 100 }}
            iconId="bomb"
            occupiedPositions={iconPositions}
            onPositionChange={handleIconPositionChange}
          />
        </div>

        {/* === Trash Section === */}
        <div className={cn(isMobile && "flex justify-end pr-2 mb-2")}>
          <DesktopIcon
            icon={<TrashIcon />}
            label="Trash"
            selected={selectedIcon === "trash"}
            onClick={() => setSelectedIcon("trash")}
            initialPosition={trashPosition}
            iconId="trash"
            occupiedPositions={iconPositions}
            onPositionChange={handleIconPositionChange}
          />
        </div>

        {/* Draggable Windows */}
        {showAbout && (
          <MacWindow
            title="About Jacksongio"
            className="w-full sm:w-96"
            onClose={() => setShowAbout(false)}
            draggable
            initialPosition={{ x: 200, y: 120 }}
            onFocus={() => bringToFront("about")}
            zIndex={getZIndex("about")}
            canMaximize
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 bg-primary border-2 border-border flex items-center justify-center">
                <span className="text-3xl text-primary-foreground font-bold">J</span>
              </div>
              <h2 className="text-2xl font-bold text-card-foreground">Jackson Giordano</h2>
              <p className="text-sm text-card-foreground font-semibold">
                Personal Repository
              </p>
              <div className="border-t-2 border-border pt-4 w-full text-left">
                <p className="text-sm text-card-foreground leading-relaxed mb-3">
                  A Computer Science graduate from Virginia Tech's College of Engineering, currently working as an Associate Software Engineer at Proven AI.
                </p>
                <p className="text-sm text-card-foreground leading-relaxed mb-3">
                  Currently pursuing a Master of Science in Computer Science with a focus in Software Engineering at the University of Tennessee.
                </p>
                <p className="text-sm text-card-foreground leading-relaxed">
                  Passionate about continuous learning and actively seeking opportunities to collaborate on coding projects.
                </p>
              </div>
              <p className="text-sm text-muted-foreground">© 2026 Jacksongio</p>
            </div>
          </MacWindow>
        )}

        {showHelp && (
          <MacWindow
            title="Help"
            className="w-full sm:w-96"
            onClose={() => setShowHelp(false)}
            draggable
            initialPosition={{ x: 250, y: 140 }}
            onFocus={() => bringToFront("help")}
            zIndex={getZIndex("help")}
            canMaximize
          >
            <div className="flex flex-col gap-4 text-card-foreground">
              <h3 className="text-xl font-bold border-b-2 border-border pb-2">Welcome to Jacksongio</h3>
              <p>This is a personal repository and digital workspace with a nostalgic Mac OS classic theme.</p>
              <div className="bg-secondary border-2 border-border p-3 mt-2">
                <p className="font-bold">Getting Started:</p>
                <ul className="text-sm space-y-1 mt-2">
                  <li>• Explore the desktop icons</li>
                  <li>• Try clicking 'Special' in the menu</li>
                  <li>• Look for hidden easter eggs</li>
                  <li>• Drag windows around!</li>
                </ul>
              </div>
            </div>
          </MacWindow>
        )}

        {showStyleEditor && (
          <StyleEditor
            onClose={() => setShowStyleEditor(false)}
            zIndex={getZIndex("styleEditor")}
            onFocus={() => bringToFront("styleEditor")}
          />
        )}

        {showFileManager && (
          <FileManager
            onClose={() => setShowFileManager(false)}
            zIndex={getZIndex("fileManager")}
            onFocus={() => bringToFront("fileManager")}
          />
        )}

        {showSystemInfo && (
          <SystemInfo
            onClose={() => setShowSystemInfo(false)}
            zIndex={getZIndex("systemInfo")}
            onFocus={() => bringToFront("systemInfo")}
          />
        )}
      </main>

      {/* Status Bar - Fixed at bottom with explicit height */}
      <div className="flex-shrink-0 h-8 bg-card border-t-2 border-border px-4 flex items-center justify-between">
        <span className="text-card-foreground text-sm truncate">Ready</span>
        <span className="text-card-foreground text-sm truncate">Jacksongio System v1.0</span>
      </div>

      {/* Flying Toasters Easter Egg */}
      {showScreensaver && (
        <FlyingToasters onClose={() => setShowScreensaver(false)} />
      )}
    </div>
  )
}
