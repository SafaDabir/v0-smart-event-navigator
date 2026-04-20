'use client'

import { Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'

export type CrowdLevel = 'low' | 'medium' | 'high'

export interface Zone {
  id: string
  name: string
  icon: React.ReactNode
  crowd: CrowdLevel
  waitTime: number
  description: string
}

const crowdColors: Record<CrowdLevel, string> = {
  low: 'bg-green-900/30 text-green-400 border-green-700',
  medium: 'bg-yellow-900/30 text-yellow-400 border-yellow-700',
  high: 'bg-red-900/30 text-red-400 border-red-700',
}

const crowdIndicator: Record<CrowdLevel, string> = {
  low: 'w-3 h-3 bg-green-400',
  medium: 'w-3 h-3 bg-yellow-400',
  high: 'w-3 h-3 bg-red-400',
}

const crowdLabels: Record<CrowdLevel, string> = {
  low: 'Low Crowd',
  medium: 'Medium Crowd',
  high: 'High Crowd',
}

export function ZoneCard({ zone }: { zone: Zone }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-gray-900 border border-gray-800 text-white">

      <div className="p-6 flex-1 flex flex-col">

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="text-blue-400 text-2xl">{zone.icon}</div>

            <div>
              <h3 className="font-semibold text-lg text-white">
                {zone.name}
              </h3>
              <p className="text-sm text-gray-400">
                {zone.description}
              </p>
            </div>
          </div>
        </div>

        {/* Crowd Badge */}
        <div className="mb-6">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${crowdColors[zone.crowd]}`}
          >
            <div className={`rounded-full ${crowdIndicator[zone.crowd]}`} />
            <span className="font-medium text-sm">
              {crowdLabels[zone.crowd]}
            </span>
          </div>
        </div>

        {/* Wait Time */}
        <div className="flex items-center gap-2 mt-auto">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-gray-300">
            Wait time:{' '}
            <span className="text-blue-400 font-bold">
              {zone.waitTime} min
            </span>
          </span>
        </div>
      </div>

      {/* Bottom Indicator */}
      <div className="h-1 bg-gray-800">
        <div
          className={`h-full transition-all duration-300 ${zone.crowd === 'low'
              ? 'bg-green-400 w-1/3'
              : zone.crowd === 'medium'
                ? 'bg-yellow-400 w-2/3'
                : 'bg-red-400 w-full'
            }`}
        />
      </div>

    </Card>
  )
}