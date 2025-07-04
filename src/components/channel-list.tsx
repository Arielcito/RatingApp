'use client'

import { Button } from "@/components/ui/button"
import { MoreVertical } from 'lucide-react'
import type { Channel } from '@/types/channel'
import { RemoteImage } from '@/components/ui/remote-image'
import { getResourceURL } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface ChannelListProps {
  channels: Channel[]
  currentChannel: Channel
  onChannelSelect: (channel: Channel) => void
  isPlaying?: boolean
  actionText?: string
}

export function ChannelList({ 
  channels, 
  currentChannel, 
  onChannelSelect,
  isPlaying = false,
  actionText = 'VER AHORA'
}: ChannelListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <AnimatePresence mode="popLayout">
        {channels.map((channel, index) => (
          <motion.div
            key={channel.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex flex-col bg-gray-900 rounded-lg overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-full aspect-video">
              <RemoteImage
                src={channel.iconUrl ? getResourceURL(channel.iconUrl) : ''}
                alt={channel.name}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                fallbackText={channel.name}
              />
            </div>
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{channel.name}</h3>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-2 line-clamp-2">{channel.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-400">{channel.pais}</span>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm"
                  onClick={() => onChannelSelect(channel)}
                >
                  {currentChannel.id === channel.id && isPlaying ? 'REPRODUCIENDO' : actionText}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
} 