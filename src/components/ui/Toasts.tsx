import { useStore } from '../../store/StoreContext'
import { CheckIcon, CloseIcon } from './Icons'

export function Toasts() {
  const { toasts, dismissToast } = useStore()

  return (
    <div
      className="pointer-events-none fixed bottom-5 right-4 z-[90] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 border border-noir/10 bg-noir px-4 py-3.5 text-ivory shadow-luxe animate-riseIn"
        >
          <span
            className={
              'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ' +
              (toast.variant === 'success' ? 'bg-gold text-noir' : 'bg-ivory/15 text-ivory')
            }
          >
            {toast.variant === 'success' ? <CheckIcon size={13} /> : <CheckIcon size={13} />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium">{toast.title}</p>
            {toast.message && (
              <p className="mt-0.5 truncate text-[12px] text-ivory/65">{toast.message}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label="Fermer la notification"
            className="text-ivory/50 transition-colors hover:text-ivory"
          >
            <CloseIcon size={15} />
          </button>
        </div>
      ))}
    </div>
  )
}
