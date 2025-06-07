import { FC, useState } from "react";
import { User } from "@/types";
import { formatDate } from "@/lib/dateUtils";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useUserStore } from "@/store";
import { showSuccessToast } from "@/lib/toast";
import { TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserDetailProps {
	user: User;
	index: number;
}

const UserDetail: FC<UserDetailProps> = ({ user, index }) => {
	const [editState, setEditState] = useState(true);
	const [editData, setEditData] = useState<User>(user);
	const updateUser = useUserStore((state) => state.updateUser);
	const removeUser = useUserStore((state) => state.removeUser);
	const message = useUserStore((state) => state.users.message);

	const handleChangeField = (key: keyof User, value: string | number) => {
		setEditData({ ...editData, [key]: value });
	};

	const handleConfirm = async () => {
		try {
			await updateUser(user.id, editData);
			showSuccessToast(message);
			setEditState(true);
		} catch {
			showSuccessToast(message);
		}
	};

	const handleDelete = async (id: number) => {
		await removeUser(id);
		showSuccessToast(message);
	};

	const handleCancel = () => {
		setEditState(true);
		setEditData(user);
	};

	return (
		<TableRow className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
			<TableCell className="px-6 py-2 whitespace-nowrap border-r">
				<div className="flex items-center justify-center">
					<span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
						{index + 1}
					</span>
				</div>
			</TableCell>
			<TableCell className="px-6 py-2 whitespace-nowrap border-r">
				<div className="flex items-center justify-around">
					<div className="flex-shrink-0 h-8 w-8">
						<div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
							<span className="text-sm font-medium text-white">
								{editData.name ? editData.name.charAt(0).toUpperCase() : "?"}
							</span>
						</div>
					</div>
					<div className="ml-3">
						<Input
							type="text"
							className={`text-sm font-normal text-gray-700 ${
								!editState
									? "bg-white focus:ring-2 focus:ring-blue-500"
									: "border-transparent bg-transparent"
							}`}
							value={editData.name || ""}
							onChange={(e) => handleChangeField("name", e.target.value)}
							disabled={editState}
						/>
					</div>
				</div>
			</TableCell>
			<TableCell className="px-6 py-2 whitespace-nowrap border-r">
				<div className="flex items-center justify-center">
					<Input
						type="text"
						className={`text-sm font-medium text-gray-700 text-center ${
							!editState
								? "bg-white focus:ring-2 focus:ring-blue-500"
								: "border-transparent bg-transparent"
						}`}
						value={editData.tel || ""}
						onChange={(e) => handleChangeField("tel", e.target.value)}
						disabled={editState}
					/>
				</div>
			</TableCell>
			<TableCell className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r">
				<div className="flex items-center justify-center">
					<div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
					{formatDate(user.createdAt)}
				</div>
			</TableCell>
			<TableCell className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r">
				<div className="flex items-center justify-center">
					<div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
					{formatDate(user.updatedAt)}
				</div>
			</TableCell>
			<TableCell className="px-6 py-2 whitespace-nowrap text-sm font-medium">
				<div className="flex items-center justify-center gap-3">
					{editState ? (
						<>
							<Button
								variant="ghost"
								size="icon"
								className="text-blue-600 hover:text-blue-800"
								onClick={() => {
									setEditData(user);
									setEditState(false);
								}}>
								<PencilIcon className="w-5 h-5" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="text-red-600 hover:text-red-800"
								onClick={() => handleDelete(user.id)}>
								<TrashIcon className="w-5 h-5" />
							</Button>
						</>
					) : (
						<>
							<Button
								variant="ghost"
								size="icon"
								className="text-green-600 hover:text-green-800"
								onClick={handleConfirm}>
								<CheckIcon className="w-5 h-5" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="text-red-600 hover:text-red-800"
								onClick={handleCancel}>
								<XMarkIcon className="w-5 h-5" />
							</Button>
						</>
					)}
				</div>
			</TableCell>
		</TableRow>
	);
};

export default UserDetail;
