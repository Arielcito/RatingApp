import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getResourceURL(resourceName?: string) {
  if (!resourceName) return '';
  
  if (resourceName.startsWith('http')) {
    return resourceName;
  }
  
  return `http://ratingapp.net.ar:8000/res/${resourceName}`;
}
