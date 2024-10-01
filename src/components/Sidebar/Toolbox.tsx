import { cn } from "@/lib/utils";
import { ILayoutDrawers } from "@/store/layout";
import { HelpCircleIcon, HomeIcon, LayersIcon, NotebookIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo } from "react";

interface MenuItem {
    key?: ILayoutDrawers;
    name: string;
    icon: React.ElementType;
    url?: string;
}

const icons: MenuItem[] = [
    { name: "Overview", icon: HomeIcon, url: "/map" },
    { key: "drawerLayer", name: "Layers", icon: LayersIcon },
    { key: "drawerNote", name: "Notes", icon: NotebookIcon },
    { key: "drawerHelp", name: "Help", icon: HelpCircleIcon },
];

function ToolBox(props: {
    activeMenu: false | ILayoutDrawers;
    onIconClick: (sidebar: ILayoutDrawers) => void
}): JSX.Element {
    const router = useRouter()

    const onClickHandler = (item: MenuItem) => {
        if (item.key) {
            props.onIconClick(item.key);
        }

        if (item.url) {
            router.push(item.url)
        }
    }


    return (
        <div className="w-14 p-2 flex flex-col items-center bg-[#1B1B1F] text-white border-e border-e-black">
            <nav className="space-y-2 flex-grow">
                {icons.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => onClickHandler(item)}
                        className={cn("p-3 text-gray-400 rounded-md hover:bg-[#24282A]", props.activeMenu === item.name && "text-white bg-black")}
                    >
                        <item.icon size={18} />
                    </button>
                ))}
            </nav>
        </div>
    );
}

export default memo(ToolBox)
