"use client"
import Header from './Header'
import Sidebar from './Sidebar'
import dynamic from 'next/dynamic';
// const NasaHeatmap = dynamic(() => import('./test/NasaHeatmap'), { ssr: false })
const GisMap = dynamic(() => import('./GisMap'), { ssr: false });


export default function GisUI() {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 relative">
          <GisMap />
          {/* <NasaHeatmap /> */}
        </main>
      </div>
    </div>
  )
}
