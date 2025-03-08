import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timeAgo = (timestamp : Date) => {
  const now = new Date()
  const differenceInSeconds = Math.floor(
    (now.getTime() - new Date(timestamp).getTime()) / 1000
  )

  const intervals = [
    { label: "year", value: 31536000 },
    { label: "month", value: 2592000 },
    { label: "day", value: 86400 },
    { label: "hour", value: 3600 },
    { label: "minute", value: 60 },
    { label: "second", value: 1 },
  ]

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i]
    const value = Math.floor(differenceInSeconds / interval.value)
    if (value >= 1) {
      return `${value} ${interval.label}${value > 1 ? "s" : ""} ago`
    }
  }
  return "Just now"

}
