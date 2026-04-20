'use client'

import { Navigation, Zap } from 'lucide-react'

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Navigation className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Smart Event Navigator
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Real-time crowd tracking & route optimization
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Live Updates</span>
          </div>
        </div>
      </div>
    </header>
  )
}
