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
  
  // Usar HTTP para el servidor de recursos ya que no tiene SSL configurado
  return `https://ratingapp.net.ar:8000/res/${resourceName}`;
}
