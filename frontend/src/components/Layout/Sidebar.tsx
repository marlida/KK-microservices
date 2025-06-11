import { Card } from "../ui/card";
import { GitFork } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";
import { FileChartColumn } from "lucide-react";
import { BellRing } from "lucide-react";
import { UserRoundCog } from "lucide-react";

const iconic = [
    {icon: GitFork, path:"/"},
    {icon: ChartNoAxesCombined, path:"/"},
    {icon: FileChartColumn, path:"/"},
    {icon: BellRing, path:"/"},
    {icon: UserRoundCog, path:"/admin"}
];

function Sidebar() {
    return (
        <Card className="py-100vh px-10">
            <div className="flex flex-col gap-10">
                {iconic.map((item, index) => (
                    <a href={item.path} key={index}>
                        <div className="cursor-pointer rounded-lg p-3 text-gray-500 transition-all duration-200 hover:bg-blue-500 hover:text-white">
                            <item.icon size={24} />
                        </div>
                    </a>
                ))}
            </div>
        </Card>
    );
}

export default Sidebar;
