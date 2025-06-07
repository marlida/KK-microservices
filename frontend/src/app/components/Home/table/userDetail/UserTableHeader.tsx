import { FC } from "react";
import {
    UserIcon,
    PhoneIcon,
    ClockIcon,
    ArrowPathIcon,
    CogIcon,
} from "@heroicons/react/24/outline";
import { TableRow, TableHead } from "@/components/ui/table";

const UserTableHeader: FC = () => {
    return (
        <TableRow>
            <TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r">
                <div className="flex items-center justify-center">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 text-blue-600 text-xs font-bold">
                        #
                    </span>
                    ลำดับ
                </div>
            </TableHead>
            <TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r">
                <div className="flex items-center justify-center">
                    <UserIcon className="w-5 h-5 mr-2 text-blue-500" />
                    ชื่อ
                </div>
            </TableHead>
            <TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r">
                <div className="flex items-center justify-center">
                    <PhoneIcon className="w-5 h-5 mr-2 text-green-500" />
                    เบอร์โทร
                </div>
            </TableHead>
            <TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r">
                <div className="flex items-center justify-center">
                    <ClockIcon className="w-5 h-5 mr-2 text-purple-500" />
                    วันที่สร้าง
                </div>
            </TableHead>
            <TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r">
                <div className="flex items-center justify-center">
                    <ArrowPathIcon className="w-5 h-5 mr-2 text-orange-500" />
                    Updated At
                </div>
            </TableHead>
            <TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center justify-center">
                    <CogIcon className="w-5 h-5 mr-2 text-orange-500" />
                    Management
                </div>
            </TableHead>
        </TableRow>
    );
};

export default UserTableHeader;
