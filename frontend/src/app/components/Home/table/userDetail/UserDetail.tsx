import { FC, useEffect, useState } from "react";
import { User } from "@/types";
import { formatDate } from "@/lib/dateUtils";
import GlobalRow from "../GlobalRow";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useUserStore } from "@/store";
import { showSuccessToast } from "@/lib/toast";

interface UserDetailProps {
    user: User;
    index: number;
}

const UserDetail: FC<UserDetailProps> = ({ user, index }) => {
    const [editState, setEditState] = useState(true);
    const [editData, setEditData] = useState<User | null>(null);
    const updateUser = useUserStore((state) => state.updateUser);
    const removeUser = useUserStore((state) => state.removeUser);
    const message = useUserStore((state) => state.users.message);

    const handleConfirm = async () => {
        if (editData) {
            const response = await updateUser(user.id, editData);
            console.log("Update response:", response);
            setEditState(true);
        }
    };

    const handleCancel = () => {
        setEditData(null);
        setEditState(true);
    };

    const handleDelete = async (id: number) => {
        if (id) {
            await removeUser(id);
            console.log("Delete response:", message);
        }
    };

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
        }
    }, [message]);

    return (
        <GlobalRow isEven={index % 2 === 0}>
            <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
                <div className="flex items-center justify-center">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                        {index + 1}
                    </span>
                </div>
            </td>
            <td className="px-6 py-2 hitespace-nowrap border-r border-gray-200">
                <div className="flex items-center justify-center">
                    <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                                {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                            </span>
                        </div>
                    </div>
                    <div className="ml-3">
                        <input
                            type="text"
                            className={`text-sm font-normal border border-gray-50/0 text-gray-700 rounded px-4 py-1 ${
                                !editState &&
                                "bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            }`}
                            defaultValue={user.name || "-"}
                            onChange={(e) => setEditData({ ...user, name: e.target.value })}
                            disabled={editState}
                        />
                    </div>
                </div>
            </td>
            <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
                <div className="flex items-center justify-center">
                    <input
                        type="text"
                        className={`text-sm font-medium border border-gray-100/0 text-gray-700 rounded px-4 py-1 text-center ${
                            !editState &&
                            "bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }`}
                        defaultValue={user.tel || "No phone"}
                        onChange={(e) => setEditData({ ...user, tel: e.target.value })}
                        disabled={editState}
                    />
                </div>
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    {formatDate(user.createdAt)}
                </div>
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                    {formatDate(user.updatedAt)}
                </div>
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center justify-center gap-8">
                    {editState ? (
                        <>
                            <button
                                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
                                onClick={() => setEditState(false)}>
                                <PencilIcon className="w-5 h-5 stroke-2" />
                            </button>
                            <button
                                className="text-red-600 hover:text-red-800 transition-colors duration-200 cursor-pointer"
                                onClick={() => handleDelete(user.id)}>
                                <TrashIcon className="w-5 h-5 stroke-2" />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer"
                                onClick={handleConfirm}>
                                <CheckIcon className="w-5 h-5 stroke-4" />
                            </button>
                            <button
                                className="text-red-600 hover:text-red-800 transition-colors duration-200 cursor-pointer"
                                onClick={handleCancel}>
                                <XMarkIcon className="w-5 h-5 stroke-4" />
                            </button>
                        </>
                    )}
                </div>
            </td>
        </GlobalRow>
    );
};

export default UserDetail;
