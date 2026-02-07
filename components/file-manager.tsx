"use client"

import { useState, useEffect } from "react"
import { MacWindow } from "./mac-window"

interface FileManagerProps {
  onClose: () => void
  zIndex: number
  onFocus: () => void
}

interface FileItem {
  name: string
  type: "folder" | "file" | "app" | "system" | "link"
  size?: string
  action?: () => void
  message?: string
  url?: string
}

interface Repository {
  id: number
  name: string
  url: string
  description: string
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <path d="M2 8 L2 26 L30 26 L30 10 L14 10 L12 6 L2 6 Z" fill="#ffcc00" stroke="#000" strokeWidth="1.5" />
      <rect x="2" y="10" width="28" height="16" fill="#ffdd44" stroke="#000" strokeWidth="1.5" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <path d="M6 2 L6 30 L26 30 L26 10 L18 2 Z" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
      <path d="M18 2 L18 10 L26 10" fill="#c0c0c0" stroke="#000" strokeWidth="1.5" />
      <rect x="8" y="14" width="12" height="2" fill="#000" />
      <rect x="8" y="18" width="16" height="2" fill="#000" />
      <rect x="8" y="22" width="10" height="2" fill="#000" />
    </svg>
  )
}

function AppIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <rect x="4" y="4" width="24" height="24" fill="#c0c0c0" stroke="#000" strokeWidth="2" />
      <rect x="6" y="6" width="20" height="4" fill="#000080" />
      <rect x="8" y="12" width="16" height="2" fill="#000" />
      <rect x="8" y="16" width="12" height="2" fill="#808080" />
      <rect x="8" y="20" width="14" height="2" fill="#808080" />
    </svg>
  )
}

function SystemIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <rect x="4" y="4" width="24" height="24" fill="#f0f0f0" stroke="#000" strokeWidth="2" />
      <rect x="8" y="8" width="16" height="10" fill="#000" />
      <rect x="10" y="10" width="4" height="3" fill="#00ff00" />
      <rect x="16" y="10" width="4" height="3" fill="#00ff00" />
      <path d="M12 15 Q16 17 20 15" stroke="#00ff00" strokeWidth="1" fill="none" />
      <rect x="10" y="22" width="12" height="2" fill="#808080" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <rect x="4" y="4" width="24" height="24" fill="#ffffff" stroke="#000" strokeWidth="2" />
      <path d="M12 10 L12 16 M12 16 L16 16 M16 16 L16 22 M16 22 L20 22" stroke="#0066cc" strokeWidth="2" fill="none" />
      <circle cx="12" cy="10" r="2" fill="#0066cc" />
      <circle cx="16" cy="16" r="2" fill="#0066cc" />
      <circle cx="20" cy="22" r="2" fill="#0066cc" />
    </svg>
  )
}

export function FileManager({ onClose, zIndex, onFocus }: FileManagerProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [currentPath, setCurrentPath] = useState("Jacksongio HD")
  const [message, setMessage] = useState<string | null>(null)
  const [repositories, setRepositories] = useState<Repository[]>([])

  // Load repositories from JSON file
  useEffect(() => {
    fetch('/github_repositories/repositories.json')
      .then(res => res.json())
      .then(data => setRepositories(data.repositories || []))
      .catch(err => console.error('Failed to load repositories:', err))
  }, [])

  const files: FileItem[] = [
    { 
      name: "System Folder", 
      type: "folder",
      action: () => {
        setMessage("ACCESS DENIED\n\nYou don't have permission to modify system files.\n\n(Just kidding, this is a simulation!)")
      }
    },
    { 
      name: "Applications", 
      type: "folder",
      action: () => setCurrentPath("Applications")
    },
    { 
      name: "Documents", 
      type: "folder",
      action: () => setCurrentPath("Documents")
    },
    { 
      name: "Github Repositories", 
      type: "folder",
      action: () => setCurrentPath("Github Repositories")
    },
    { 
      name: "Read Me First!", 
      type: "file",
      size: "2 KB",
      action: () => {
        setMessage("Welcome to Jacksongio!\n\nThis app was crafted with love and nostalgia for the classic Macintosh era.\n\nTips:\n- Try clicking 'Special' in the menu\n- Look for hidden icons on the desktop\n- The Coffee Break icon is pretty chill\n\nEnjoy!")
      }
    },
    { 
      name: "Jacksongio.app", 
      type: "app",
      size: "1.2 MB",
      action: () => {
        setMessage("Jacksongio v1.0\n\nThe application is already running!\n\nMemory Used: 640 KB\n(Should be enough for anybody)")
      }
    },
    { 
      name: "Export Notes", 
      type: "app",
      size: "128 KB",
      action: () => {
        const content = `Jacksongio - Personal Repository
==============================
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

Thank you for visiting Jacksongio!

This is my personal repository and digital workspace.

Jacksongio System v1.0
© 2026 Jacksongio`
        
        const blob = new Blob([content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'jacksongio-notes.txt'
        a.click()
        URL.revokeObjectURL(url)
        setMessage("File exported successfully!\n\nCheck your downloads folder for 'jacksongio-notes.txt'")
      }
    },
    { 
      name: "Desktop DB", 
      type: "system",
      size: "256 KB",
      action: () => {
        setMessage("CORRUPTED DATABASE DETECTED\n\n...\n...\n\nJust kidding! Everything is fine.\n\nThis file helps the system remember where your icons should be.")
      }
    },
    { 
      name: "secret.txt", 
      type: "file",
      size: "42 B",
      action: () => {
        setMessage("The answer to life, the universe, and everything is...\n\n42\n\n(You found the secret file!)")
      }
    },
  ]

  const applicationsFiles: FileItem[] = [
    { 
      name: "..", 
      type: "folder",
      action: () => setCurrentPath("Jacksongio HD")
    },
    { 
      name: "Calculator", 
      type: "app",
      size: "64 KB",
      action: () => setMessage("Calculator.app\n\n7 + 7 = 49\n\n(Our calculator might need some work)")
    },
    { 
      name: "Terminal", 
      type: "app",
      size: "256 KB",
      action: () => setMessage("> HELLO WORLD\n> SYSTEM READY\n> _\n\n(Terminal access is restricted in this dimension)")
    },
    { 
      name: "Games", 
      type: "folder",
      action: () => setMessage("Coming Soon!\n\nWe're working on bringing you classic games like:\n- Asteroids\n- Snake\n- Breakout\n\nStay tuned!")
    },
  ]

  const documentsFiles: FileItem[] = [
    { 
      name: "..", 
      type: "folder",
      action: () => setCurrentPath("Jacksongio HD")
    },
    { 
      name: "my_first_note.txt", 
      type: "file",
      size: "1 KB",
      action: () => setMessage("Welcome to my personal repository!\n\n(This is where I keep my notes and thoughts)")
    },
    { 
      name: "todo.txt", 
      type: "file",
      size: "512 B",
      action: () => setMessage("TODO:\n\n[ ] Explore more easter eggs\n[ ] Try the flying toasters\n[x] Find this secret file\n[ ] Touch grass")
    },
    { 
      name: "Notes", 
      type: "folder",
      action: () => setMessage("This folder is empty.\n\n(Or is it? Some mysteries remain unsolved...)")
    },
  ]

  // Github Repositories files - dynamically generated from JSON
  const githubFiles: FileItem[] = [
    { 
      name: "..", 
      type: "folder",
      action: () => setCurrentPath("Jacksongio HD")
    },
    ...repositories
      .filter(repo => repo.url) // Only show repos with URLs
      .map(repo => ({
        name: repo.name || `Repository ${repo.id}`,
        type: "link" as const,
        size: "Link",
        action: () => {
          if (repo.url) {
            window.open(repo.url, "_blank")
          }
        }
      }))
  ]

  const currentFiles = currentPath === "Applications" ? applicationsFiles : 
                       currentPath === "Documents" ? documentsFiles :
                       currentPath === "Github Repositories" ? githubFiles : files

  const getIcon = (type: string) => {
    switch (type) {
      case "folder": return <FolderIcon />
      case "app": return <AppIcon />
      case "system": return <SystemIcon />
      case "link": return <LinkIcon />
      default: return <FileIcon />
    }
  }

  return (
    <>
      <MacWindow
        title={currentPath}
        className="w-[500px]"
        onClose={onClose}
        draggable
        initialPosition={{ x: 150, y: 60 }}
        onFocus={onFocus}
        zIndex={zIndex}
        canMinimize
        canMaximize
      >
        <div className="flex flex-col gap-2">
          {/* Path bar */}
          <div className="bg-secondary border-2 border-border px-2 py-1 text-sm text-card-foreground">
            Path: /{currentPath}
          </div>
          
          {/* File list */}
          <div className="bg-input border-2 border-border min-h-[300px] max-h-[400px] overflow-auto">
            <table className="w-full">
              <thead className="bg-secondary sticky top-0">
                <tr className="text-left text-card-foreground border-b-2 border-border">
                  <th className="px-2 py-1 w-10"></th>
                  <th className="px-2 py-1">Name</th>
                  <th className="px-2 py-1 w-20">Size</th>
                </tr>
              </thead>
              <tbody>
                {currentFiles.map((file) => (
                  <tr
                    key={file.name}
                    className={`cursor-pointer border-b border-border ${
                      selectedFile === file.name 
                        ? "bg-primary text-primary-foreground" 
                        : "text-card-foreground hover:bg-secondary"
                    }`}
                    onClick={() => setSelectedFile(file.name)}
                    onDoubleClick={() => file.action?.()}
                  >
                    <td className="px-2 py-1">{getIcon(file.type)}</td>
                    <td className="px-2 py-1">{file.name}</td>
                    <td className="px-2 py-1 text-sm">{file.size || "--"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Status bar */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{currentFiles.length} items</span>
            <span>Double-click to open</span>
          </div>
        </div>
      </MacWindow>

      {/* Message Dialog */}
      {message && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/40"
          style={{ zIndex: zIndex + 100 }}
          onClick={() => setMessage(null)}
        >
          <div 
            className="bg-card border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-primary px-2 py-1 border-b-2 border-border">
              <span className="text-primary-foreground font-bold">Message</span>
            </div>
            <div className="p-4">
              <pre className="whitespace-pre-wrap text-card-foreground font-mono text-sm mb-4">
                {message}
              </pre>
              <button
                onClick={() => setMessage(null)}
                className="w-full px-4 py-2 bg-secondary text-card-foreground border-2 border-border hover:bg-muted shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
