import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface HeatmapCardProps {
  title: string
  info: string
  dataType: string
}

export default function HeatmapCard({ title, info, dataType }: HeatmapCardProps) {
  const [isActive, setIsActive] = useState(false)

  return (
    <Card className="w-[370px] h-[140px] relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(https://picsum.photos/200/300?grayscale)` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 p-4 flex flex-col h-full">
        <div className="flex justify-between items-start">
          {/* <h3 className="text-xl font-semibold text-white">{title}</h3> */}
          <div className="ms-auto flex items-center space-x-2">
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
              className="data-[state=checked]:bg-green-500"
              aria-label={`Toggle ${title} layer`}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-white hover:text-gray-200 transition-colors">
                    <Info className="h-5 w-5" />
                    <span className="sr-only">Layer information</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-sm">{info}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="flex-grow" />
        <div className="text-white">
          <h4 className="text-sm font-medium mb-1">{dataType}</h4>
          <p className="text-xs">Status: {isActive ? 'Active' : 'Inactive'}</p>
        </div>
      </div>
    </Card>
  )
}
