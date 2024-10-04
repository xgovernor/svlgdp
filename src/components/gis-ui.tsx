
import Sidebar from './Sidebar'
import dynamic from 'next/dynamic';
// const NasaHeatmap = dynamic(() => import('./test/NasaHeatmap'), { ssr: false })
const GisMap = dynamic(() => import('./GisMap'), { ssr: false });


export default function GisUI() {
  return (
    <div className="h-[calc(100vh-45px)] flex flex-1 overflow-hidden">
      <Sidebar />

      <GisMap />
      {/* <NasaHeatmap /> */}
    </div>
  )
}
