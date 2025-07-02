'use client'

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Channel } from '@/types/channel'
import Image from 'next/image'
import { getResourceURL } from '@/lib/utils'

interface NavigationControlsProps {
  onPrevious: () => void
  onNext: () => void
  currentChannel: Channel | null
  disabled?: boolean
}

export function NavigationControls({ 
  onPrevious, 
  onNext, 
  currentChannel,
  disabled = false 
}: NavigationControlsProps) {
  if (!currentChannel) return null

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        {currentChannel?.iconUrl && (
          <div className="relative w-12 h-12">
            <Image
              src={getResourceURL(currentChannel.iconUrl)}
              alt={currentChannel.name}
              fill
              className="object-cover rounded-lg"
              priority={false}
              quality={75}
              unoptimized={true}
            />
          </div>
        )}
        <h1 className="text-2xl font-bold text-white">{currentChannel.name}</h1>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={onPrevious}
          disabled={disabled}
          className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={onNext}
          disabled={disabled}
          className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 