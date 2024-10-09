import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleError = (error: any) => {
  const errorMessage = error?.data?.message || "Something went wrong"
  console.log(errorMessage);
  toast.error(errorMessage)
}
