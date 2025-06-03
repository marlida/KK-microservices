import { FC, useState } from "react";
import { Admin } from "@/types";
import { formatDate } from "@/lib/dateUtils";
import GlobalRow from "../GlobalRow";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAdminStore } from "@/store";
import { showSuccessToast } from "@/lib/toast";

interface AdminDetailProps {
	admin: Admin;
	index: number;
}

const AdminDetail: FC<AdminDetailProps> = ({ admin, index }) => {
	const [editState, setEditState] = useState(true);
	const [editData, setEditData] = useState<Admin | null>(null);
	const message = useAdminStore((state) => state.admins.message);
	const updateAdmin = useAdminStore((state) => state.updateAdmin);
	const removeAdmin = useAdminStore((state) => state.removeAdmin);

	const handleChangeField = (key: keyof Admin, value: string | number) => {
		if (!editData) return;
		setEditData({ ...editData, [key]: value });
	};

	const handleConfirm = async () => {
		if (editData) {
			try {
				await updateAdmin(admin.id, editData);
				showSuccessToast(message);
			} catch {
				showSuccessToast(message);
			}
		}
		setEditState(true);
		setEditData(null);
	};

	const handleDelete = async (id: number) => {
		await removeAdmin(id);
		showSuccessToast(message);
	};

	const handleCancel = () => {
		setEditState(true);
		setEditData(null);
	};

	const currentData = editData ?? admin;

	return (
		<GlobalRow isEven={index % 2 === 0}>
			<td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
				<div className="flex items-center justify-center">
					<span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
						{index + 1}
					</span>
				</div>
			</td>

			{/* ชื่อแอดมิน */}
			<td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
				<div className="flex items-center justify-around">
					<div className="flex-shrink-0 h-8 w-8">
						<div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
							<span className="text-sm font-medium text-white">
								{currentData.name?.charAt(0).toUpperCase() || "?"}
							</span>
						</div>
					</div>
					<div className="ml-3">
						<input
							type="text"
							className={`text-sm font-normal text-gray-700 rounded px-4 py-1 ${
								!editState
									? "bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
									: "border border-gray-50/0"
							}`}
							value={currentData.name ?? ""}
							onChange={(e) => handleChangeField("name", e.target.value)}
							disabled={editState}
						/>
					</div>
				</div>
			</td>

			{/* เบอร์โทร */}
			<td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
				<div className="flex items-center justify-center">
					<input
						type="text"
						className={`text-sm font-medium text-gray-700 rounded px-4 py-1 text-center ${
							!editState
								? "bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
								: "border border-gray-100/0"
						}`}
						value={currentData.tel ?? ""}
						onChange={(e) => handleChangeField("tel", e.target.value)}
						disabled={editState}
					/>
				</div>
			</td>

			{/* วันที่สร้าง */}
			<td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
				<div className="flex items-center justify-center">
					<div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
					{formatDate(admin.createdAt)}
				</div>
			</td>

			{/* วันที่แก้ไขล่าสุด */}
			<td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
				<div className="flex items-center justify-center">
					<div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
					{formatDate(admin.updatedAt)}
				</div>
			</td>

			{/* ปุ่ม Action */}
			<td className="px-6 py-2 whitespace-nowrap text-sm font-medium">
				<div className="flex items-center justify-center gap-8">
					{editState ? (
						<>
							<button
								className="text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
								onClick={() => {
									setEditData(admin);
									setEditState(false);
								}}>
								<PencilIcon className="w-5 h-5 stroke-2" />
							</button>
							<button
								className="text-red-600 hover:text-red-800 transition-colors duration-200 cursor-pointer"
								onClick={() => handleDelete(admin.id)}>
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

export default AdminDetail;
