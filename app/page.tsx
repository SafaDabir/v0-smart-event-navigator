'use client'

import { useState, useCallback } from 'react'
import {
  Ticket,
  UtensilsCrossed,
  Droplet,
  Users,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ZoneCard, type Zone, type CrowdLevel } from '@/components/ZoneCard'
import { BestRouteModal } from '@/components/BestRouteModal'
import { DashboardHeader } from '@/components/DashboardHeader'

const initialZones: Zone[] = [
  {
    id: 'entry',
    name: 'Entry Gates',
    icon: <Ticket />,
    crowd: 'medium',
    waitTime: 15,
    description: 'Main entrance queue',
  },
  {
    id: 'food',
    name: 'Food Court',
    icon: <UtensilsCrossed />,
    crowd: 'high',
    waitTime: 25,
    description: 'Food vendors & restaurants',
  },
  {
    id: 'washroom',
    name: 'Washrooms',
    icon: <Droplet />,
    crowd: 'low',
    waitTime: 5,
    description: 'Restroom facilities',
  },
  {
    id: 'seating',
    name: 'Seating Area',
    icon: <Users />,
    crowd: 'medium',
    waitTime: 10,
    description: 'General seating & lounge',
  },
]

export default function Home() {
  const [zones, setZones] = useState<Zone[]>(initialZones)
  const [showRoute, setShowRoute] = useState(false)
  const [suggestedRoute, setSuggestedRoute] = useState<Zone[]>([])

  const simulateUpdate = useCallback(() => {
    setZones((prevZones) =>
      prevZones.map((zone) => {
        const crowdLevels: CrowdLevel[] = ['low', 'medium', 'high']
        const newCrowd =
          crowdLevels[Math.floor(Math.random() * crowdLevels.length)]
        const newWaitTime = Math.floor(Math.random() * 30) + 1

        return {
          ...zone,
          crowd: newCrowd,
          waitTime: newWaitTime,
        }
      })
    )
  }, [])

  const findBestRoute = useCallback(() => {
    const sorted = [...zones].sort((a, b) => a.waitTime - b.waitTime)
    setSuggestedRoute(sorted)
    setShowRoute(true)
  }, [zones])

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900">

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            onClick={simulateUpdate}
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800"
          >
            🔄 Refresh Data
          </Button>

          <Button
            onClick={findBestRoute}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-md"
          >
            <ArrowRight className="w-4 h-4" />
            Find Best Route
          </Button>
        </div>

        {/* AI Suggestion */}
        <p className="mb-8 text-green-400 font-medium">
          ✔ AI Suggestion: Use Washrooms → Lowest wait time → Saves ~10 mins
        </p>

        {/* Zone grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {zones.map((zone) => (
            <ZoneCard key={zone.id} zone={zone} />
          ))}
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Average wait time */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg">
            <p className="text-sm text-gray-400 mb-2">
              Average Wait Time
            </p>
            <p className="text-3xl font-bold text-white">
              {Math.round(
                zones.reduce((sum, z) => sum + z.waitTime, 0) / zones.length
              )}{' '}
              <span className="text-lg text-gray-400">min</span>
            </p>
          </div>

          {/* Busiest zone */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg">
            <p className="text-sm text-gray-400 mb-2">Busiest Zone</p>
            <p className="text-3xl font-bold text-white">
              {
                zones.reduce((max, z) =>
                  z.waitTime > max.waitTime ? z : max
                ).name
              }
            </p>
          </div>

          {/* Status overview */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg">
            <p className="text-sm text-gray-400 mb-3">Zone Status</p>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Low crowd</span>
                <span className="font-bold text-green-400">
                  {zones.filter((z) => z.crowd === 'low').length}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Medium crowd</span>
                <span className="font-bold text-yellow-400">
                  {zones.filter((z) => z.crowd === 'medium').length}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">High crowd</span>
                <span className="font-bold text-red-400">
                  {zones.filter((z) => z.crowd === 'high').length}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal */}
      <BestRouteModal
        isOpen={showRoute}
        onClose={() => setShowRoute(false)}
        zones={zones}
        suggestedRoute={suggestedRoute}
      />
    </main>
  )
}