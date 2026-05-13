'use client'
import { useState, useRef, useEffect } from 'react'
import { Bell } from 'lucide-react'

export default function NotificationPopover() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [popoverRef])

  return (
    <div className="relative" ref={popoverRef}>
      <button onClick={() => setOpen(o => !o)} className="relative w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
        <Bell size={15} className="text-slate-500" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-10 w-72 bg-white rounded-xl border border-slate-200 p-4 z-50 shadow-lg animate-slide-up">
          <p className="text-xs font-semibold text-slate-700 mb-3">Notifications</p>
          {notifications.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">No new notifications</p>
          ) : (
            <div className="space-y-2">
              {notifications.map((n, i) => (
                <div key={i} className="text-xs text-slate-600">{n.message}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
