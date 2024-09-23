"use client"
import Header from './Header'
import Sidebar from './Sidebar'
import GisMap from './GisMap'


export default function GisUI() {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 relative">
          <GisMap />
        </main>
      </div>
    </div>
  )
}
