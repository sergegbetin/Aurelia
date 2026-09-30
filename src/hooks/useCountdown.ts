import { useEffect, useMemo, useState } from 'react'
import { NEW_YEAR_TARGET } from '../data/content'

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  complete: boolean
}

const diff = (target: string): CountdownParts => {
  const distance = new Date(target).getTime() - Date.now()
  if (Number.isNaN(distance) || distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, complete: true }
  }
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    complete: false,
  }
}

/** Countdown to the New Year — target date is configured in `src/data/content.ts`. */
export function useCountdown(target: string = NEW_YEAR_TARGET): CountdownParts {
  const [parts, setParts] = useState<CountdownParts>(() => diff(target))

  useEffect(() => {
    setParts(diff(target))
    const id = window.setInterval(() => setParts(diff(target)), 1000)
    return () => window.clearInterval(id)
  }, [target])

  return parts
}

export const pad = (value: number) => String(value).padStart(2, '0')

export function useCountdownParts() {
  const { days, hours, minutes } = useCountdown()
  return useMemo(
    () => [
      { label: 'Days', value: String(days) },
      { label: 'Hours', value: pad(hours) },
      { label: 'Minutes', value: pad(minutes) },
    ],
    [days, hours, minutes],
  )
}
