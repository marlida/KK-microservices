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
                        className={`cursor-pointer p-4 transition-all duration-200 ${
                            isActive(item.path)
                                ? "bg-purple-200 text-purple-900"
                                : "text-purple-500 hover:bg-purple-600 hover:text-white"
                        }`}
                    >
                        <item.icon size={24} />
                    </div>
                </a>
            ))}
        </div>
    );
}

export default Sidebar;
