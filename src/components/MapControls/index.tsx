"use client";
import { useMap } from "react-leaflet"
import { Button } from "../ui/button"
import { Home, NotebookPenIcon, Send, Share2, ZoomIn, ZoomOut } from "lucide-react"
import { memo } from "react"
import { useLayout } from "@/store/layout";
import { Marker } from "leaflet";
import { useMap as useMapStore } from "@/store/map"
import { useNoteStore } from "@/store/note";


const MapControls = () => {
    const map = useMap()
    const { toggleSidebar } = useLayout()
    const { layer, overlay } = useMapStore()
    const { form, updateForm } = useNoteStore();

    const handleZoomIn = () => map.zoomIn();
    const handleZoomOut = () => map.zoomOut();
    const handleHome = () => map.flyTo([22.0716, 89.4672], 9.5);
    const handleNewNote = () => {
        const { lat, lng } = map.getCenter();
        const zoom = map.getZoom();
        const activeOverlays = overlay.map(i => i.name);
        console.log({ lat, lng, zoom, activeOverlays });

        updateForm({ ...form, coordinates: { lat, lng }, layer: layer.name, overlay: activeOverlays, zoom })
        toggleSidebar("drawerNewNote");

        const marker: Marker = new Marker([lat, lng], { draggable: true, title: `Mark-1`, riseOnHover: true });

        marker.on("click", () => {
            marker.remove();
        });
        map.addLayer(marker);
    };
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'SVLGDP',
                text: 'Check out SVLGDP',
                url: 'https://svlgdp.com',
            })
        }
    }

    function handleCurrentLocation(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                map.flyTo([latitude, longitude], 18);
            })
        }
    }

    return (
        <div className="absolute top-5 right-4 flex flex-col gap-2 z-[999]">

            <ToolBox actions={[
                { title: 'Zoom In', icon: ZoomIn, onClick: handleZoomIn },
                { title: 'Zoom Out', icon: ZoomOut, onClick: handleZoomOut },
                { title: 'Current Location', icon: Send, onClick: handleCurrentLocation },
            ]} />

            <Button className="text-[#CBD0D0] bg-[#1B1B1F] hover:bg-[#24282A] border border-black" variant="secondary" size="icon" onClick={handleHome}>
                <Home className="h-4 w-4" />
            </Button>

            <ToolBox actions={[
                { title: 'Message', icon: NotebookPenIcon, onClick: handleNewNote },
                { title: 'Share', icon: Share2, onClick: handleShare },
            ]} />
        </div>
    )
}


/**
 * Renders a toolbox with buttons
 * @param {{ actions: { title: string, icon?: React.ElementType, onClick?: () => void }[] }} props
 * @returns {JSX.Element}
 */
const ToolBox = ({ actions }: { actions: { title: string, icon?: React.ElementType, onClick?: () => void }[] }): JSX.Element => {
    return (
        <div className="flex flex-col rounded-md overflow-hidden bg-[#1B1B1F] text-[#CBD0D0] border border-black">
            {actions.map((action, i) => (
                <Button key={i} className="text-[#CBD0D0] bg-[#1B1B1F] hover:bg-[#24282A] [&:not(:last-of-type)]:border-b border-b-black rounded-none" variant="secondary" size="icon" onClick={action.onClick}>
                    {action.icon && <action.icon className="h-4 w-4" />}
                </Button>
            ))}
        </div>
    )
}

export default memo(MapControls)
