'use client'

import { X, MapPin, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Zone } from './ZoneCard'

interface BestRouteModalProps {
  isOpen: boolean
  onClose: () => void
  zones: Zone[]
  suggestedRoute: Zone[]
}

export function BestRouteModal({
  isOpen,
  onClose,
  suggestedRoute,
}: BestRouteModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-card border border-border">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Suggested Route</h2>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Follow this route to experience the least crowded zones:
          </p>

          {/* Route steps */}
          <div className="space-y-3 mb-6">
            {suggestedRoute.map((zone, index) => (
              <div key={zone.id} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  {index < suggestedRoute.length - 1 && (
                    <div className="w-0.5 h-8 bg-border my-1" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{zone.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Wait time: {zone.waitTime} min
                      </p>
                    </div>
                    {zone.crowd === 'low' && (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-100 font-medium">
                        Low
                      </span>
                    )}
                    {zone.crowd === 'medium' && (
                      <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-100 font-medium">
                        Medium
                      </span>
                    )}
                    {zone.crowd === 'high' && (
                      <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-100 font-medium">
                        High
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total wait time */}
          <div className="bg-muted rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">Total estimated time</p>
            <p className="text-2xl font-bold text-accent">
              {suggestedRoute.reduce((sum, z) => sum + z.waitTime, 0)} minutes
            </p>
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Close
          </Button>
        </div>
      </Card>
    </div>
  )
}
