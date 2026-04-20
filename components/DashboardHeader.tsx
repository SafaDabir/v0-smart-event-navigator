'use client'

import { Navigation, Zap } from 'lucide-react'

export function DashboardHeader() {
  return (
    <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Left Section */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600/20">
              <Navigation className="w-6 h-6 text-blue-400" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">
                AI Crowd Flow Optimizer
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                AI-powered crowd intelligence & smart route optimization
              </p>
            </div>
          </div>

          {/* Right Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">
              Live Updates
            </span>
          </div>

        </div>
      </div>
    </header>
  )
}