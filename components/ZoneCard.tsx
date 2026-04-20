'use client'

import { Clock, Users } from 'lucide-react'
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
  low: 'bg-green-100 text-green-900 border-green-300 dark:bg-green-950 dark:text-green-100 dark:border-green-800',
  medium:
    'bg-yellow-100 text-yellow-900 border-yellow-300 dark:bg-yellow-950 dark:text-yellow-100 dark:border-yellow-800',
  high: 'bg-red-100 text-red-900 border-red-300 dark:bg-red-950 dark:text-red-100 dark:border-red-800',
}

const crowdIndicator: Record<CrowdLevel, string> = {
  low: 'w-3 h-3 bg-green-500 dark:bg-green-400',
  medium: 'w-3 h-3 bg-yellow-500 dark:bg-yellow-400',
  high: 'w-3 h-3 bg-red-500 dark:bg-red-400',
}

const crowdLabels: Record<CrowdLevel, string> = {
  low: 'Low Crowd',
  medium: 'Medium Crowd',
  high: 'High Crowd',
}

export function ZoneCard({ zone }: { zone: Zone }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full bg-card border border-border">
      <div className="p-6 flex-1 flex flex-col">
        {/* Header with icon and name */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="text-primary text-2xl">{zone.icon}</div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                {zone.name}
              </h3>
              <p className="text-sm text-muted-foreground">{zone.description}</p>
            </div>
          </div>
        </div>

        {/* Crowd indicator badge */}
        <div className="mb-6">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${crowdColors[zone.crowd]}`}
          >
            <div className={`rounded-full ${crowdIndicator[zone.crowd]}`} />
            <span className="font-medium text-sm">{crowdLabels[zone.crowd]}</span>
          </div>
        </div>

        {/* Wait time info */}
        <div className="flex items-center gap-2 mt-auto">
          <Clock className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-foreground">
            Wait time: <span className="text-accent font-bold">{zone.waitTime} min</span>
          </span>
        </div>
      </div>

      {/* Visual crowd indicator bar */}
      <div className="h-1 bg-border">
        <div
          className={`h-full transition-all duration-300 ${
            zone.crowd === 'low'
              ? 'bg-green-500 dark:bg-green-400 w-1/3'
              : zone.crowd === 'medium'
                ? 'bg-yellow-500 dark:bg-yellow-400 w-2/3'
                : 'bg-red-500 dark:bg-red-400 w-full'
          }`}
        />
      </div>
    </Card>
  )
}
