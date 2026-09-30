import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '../../utils'
import { CloseIcon } from './Icons'

function useFocusTrap(active: boolean, panelRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!active) return
    const previous = document.activeElement as HTMLElement | null
    const node = panelRef.current
    node?.focus()
    const handler = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !node) return
      const focusables = node.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handler)
    return () => {
      document.removeEventListener('keydown', handler)
      previous?.focus?.()
    }
  }, [active, panelRef])
}

export function Drawer({
  open,
  onClose,
  children,
  side = 'right',
  className,
  labelledBy,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  side?: 'right' | 'left'
  className?: string
  labelledBy?: string
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  useFocusTrap(open, panelRef)
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
      <div
        className="absolute inset-0 bg-noir/55 backdrop-blur-[2px] animate-fadeIn"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          'absolute inset-y-0 flex w-full max-w-[26rem] flex-col bg-ivory shadow-drawer outline-none',
          side === 'right' ? 'right-0 animate-slideInRight' : 'left-0 animate-slideInLeft',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function Modal({
  open,
  onClose,
  children,
  className,
  labelledBy,
  size = 'md',
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  labelledBy?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  useFocusTrap(open, panelRef)
  if (!open) return null

  const sizes = {
    sm: 'max-w-lg',
    md: 'max-w-3xl',
    lg: 'max-w-5xl',
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <div
        className="fixed inset-0 bg-noir/60 backdrop-blur-[2px] animate-fadeIn"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          'relative w-full bg-ivory shadow-luxe outline-none animate-riseIn',
          sizes[size],
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la fenêtre"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center border border-noir/10 bg-ivory/90 text-noir transition-colors hover:bg-noir hover:text-ivory"
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  )
}
