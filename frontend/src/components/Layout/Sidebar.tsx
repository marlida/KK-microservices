"use client";

import { usePathname } from "next/navigation";

import { GitFork } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";
import { FileChartColumn } from "lucide-react";
import { BellRing } from "lucide-react";
import { UserRoundCog } from "lucide-react";

const iconic = [
    { icon: GitFork, path: "/" },
    { icon: ChartNoAxesCombined, path: "/dashboard" },
    { icon: FileChartColumn, path: "/files" },
    { icon: BellRing, path: "/notifications" },
    { icon: UserRoundCog, path: "/admin" },
];

function Sidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <div className="flex flex-col">
            {iconic.map((item, index) => (
                <a href={item.path} key={index}>
                    <div
                        className={`cursor-pointer p-4 transition-all duration-200 dark:text-white ${
                            isActive(item.path) ? "bg-sec-blue dark:bg-zinc-800 text-white" : "hover:bg-blue-100 hover:dark:bg-zinc-700 text-regal-blue"
                        }`}>
                        <item.icon size={24} />
                    </div>
                    {isActive(item.path) && <div className="h-1 bg-blue-500"></div>}
                </a>
            ))}
        </div>
    );
}

export default Sidebar;
