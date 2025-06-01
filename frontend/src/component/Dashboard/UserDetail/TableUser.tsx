import { updateUser, deleteUser } from "@/services/ServiceUser";
import { User } from "@/types/types";
import { useState } from "react";

interface TableUserProps {
	safeUsers: User[];
	setShowModal: (show: boolean) => void;
	onUserDeleted?: () => void; // Callback to refresh user list after deletion
}

export default function TableUser({ safeUsers, setShowModal, onUserDeleted }: TableUserProps) {
	const [editingUser, setEditingUser] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
	const [editForm, setEditForm] = useState<{
		name: string;
		tel: string;
	}>({
		name: "",
		tel: "",
	});

	// Validation function
	const validateForm = () => {
		if (!editForm.name.trim()) {
			setErrorMessage("กรุณากรอกชื่อผู้ใช้");
			return false;
		}
		if (!editForm.tel.trim()) {
			setErrorMessage("กรุณากรอกเบอร์โทรศัพท์");
			return false;
		}
		// Basic phone number validation (Thai format)
		const phoneRegex = /^[0-9]{9,10}$/;
		if (!phoneRegex.test(editForm.tel.replace(/[-\s]/g, ""))) {
			setErrorMessage("รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง (ต้องเป็นตัวเลข 9-10 หลัก)");
			return false;
		}
		return true;
	};

	const handleEditClick = (user: User) => {
		setEditingUser(user.id.toString());
		setErrorMessage("");
		setSuccessMessage("");
		setEditForm({
			name: user.name,
			tel: user.tel,
		});
	};

	const handleSaveClick = async (userId: string) => {
		// Validate form before submitting
		if (!validateForm()) {
			return;
		}

		try {
			setIsLoading(true);
			setErrorMessage("");
			setSuccessMessage("");

			const user = safeUsers.find((user) => user.id.toString() === userId);
			if (user) {
				const updatedUser: User = {
					...user,
					name: editForm.name.trim(),
					tel: editForm.tel.trim(),
				};
				await updateUser(userId, updatedUser);
				setEditingUser(null);
				setSuccessMessage("อัปเดตข้อมูลผู้ใช้สำเร็จ");

				// Clear success message after 3 seconds
				setTimeout(() => {
					setSuccessMessage("");
				}, 3000);
			}
		} catch (error: unknown) {
			console.error("Error updating user:", error);

			// Set user-friendly error message
			if (error && typeof error === "object" && "response" in error) {
				const axiosError = error as { response?: { status?: number } };
				if (axiosError.response?.status === 404) {
					setErrorMessage("ไม่พบข้อมูลผู้ใช้ที่ต้องการแก้ไข");
				} else if (axiosError.response?.status === 400) {
					setErrorMessage("ข้อมูลที่กรอกไม่ถูกต้อง");
				} else if (axiosError.response?.status === 500) {
					setErrorMessage("เกิดข้อผิดพลาดจากเซิร์ฟเวอร์");
				} else {
					setErrorMessage("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
				}
			} else if (error && typeof error === "object" && "message" in error) {
				const errorWithMessage = error as { message?: string };
				if (errorWithMessage.message?.includes("Network Error")) {
					setErrorMessage("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
				} else {
					setErrorMessage("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
				}
			} else {
				setErrorMessage("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancelEdit = () => {
		setEditingUser(null);
		setErrorMessage("");
		setSuccessMessage("");
		setEditForm({ name: "", tel: "" });
	};

	const handleDeleteClick = (userId: string) => {
		setShowDeleteConfirm(userId);
		setErrorMessage("");
		setSuccessMessage("");
	};

	const handleConfirmDelete = async (userId: string) => {
		try {
			setDeletingUserId(userId);
			setErrorMessage("");
			setSuccessMessage("");

			await deleteUser(userId);
			setShowDeleteConfirm(null);
			setSuccessMessage("ลบข้อมูลผู้ใช้สำเร็จ");

			// Call the callback to refresh user list
			if (onUserDeleted) {
				onUserDeleted();
			}

			// Clear success message after 3 seconds
			setTimeout(() => {
				setSuccessMessage("");
			}, 3000);
		} catch (error: unknown) {
			console.error("Error deleting user:", error);

			// Set user-friendly error message
			if (error && typeof error === "object" && "response" in error) {
				const axiosError = error as { response?: { status?: number } };
				if (axiosError.response?.status === 404) {
					setErrorMessage("ไม่พบข้อมูลผู้ใช้ที่ต้องการลบ");
				} else if (axiosError.response?.status === 400) {
					setErrorMessage("ไม่สามารถลบข้อมูลผู้ใช้นี้ได้");
				} else if (axiosError.response?.status === 500) {
					setErrorMessage("เกิดข้อผิดพลาดจากเซิร์ฟเวอร์");
				} else {
					setErrorMessage("เกิดข้อผิดพลาดในการลบข้อมูล");
				}
			} else if (error && typeof error === "object" && "message" in error) {
				const errorWithMessage = error as { message?: string };
				if (errorWithMessage.message?.includes("Network Error")) {
					setErrorMessage("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
				} else {
					setErrorMessage("เกิดข้อผิดพลาดในการลบข้อมูล");
				}
			} else {
				setErrorMessage("เกิดข้อผิดพลาดในการลบข้อมูล");
			}
		} finally {
			setDeletingUserId(null);
		}
	};

	const handleCancelDelete = () => {
		setShowDeleteConfirm(null);
	};

	return (
		<div className="overflow-x-auto">
			{/* Success Message */}
			{successMessage && (
				<div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
					<div className="flex items-center">
						<svg
							className="h-4 w-4 text-green-400 mr-2"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
						<p className="text-sm text-green-800">{successMessage}</p>
					</div>
					<button
						onClick={() => setSuccessMessage("")}
						className="text-green-400 hover:text-green-600">
						<svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
			)}
			{/* Error Message */}
			{errorMessage && (
				<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center justify-between">
					<div className="flex items-center">
						<svg
							className="h-4 w-4 text-red-400 mr-2"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
								clipRule="evenodd"
							/>
						</svg>
						<p className="text-sm text-red-800">{errorMessage}</p>
					</div>
					<button
						onClick={() => setErrorMessage("")}
						className="text-red-400 hover:text-red-600">
						<svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
			)}
			<table className="w-full">
				<thead className="bg-gray-50">
					<tr>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
							ID
						</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
							ชื่อผู้ใช้
						</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
							เบอร์โทร
						</th>
						<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
							วันที่สมัคร
						</th>
						<th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
							จัดการ
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{safeUsers.length > 0 ? (
						safeUsers.map((user, index) => (
							<tr key={user.id} className="hover:bg-gray-50">
								<td className="px-4 py-3 text-sm font-medium text-gray-900">
									#{index + 1}
								</td>
								<td className="px-4 py-3">
									<div className="flex items-center">
										<div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
											<span className="text-white text-xs font-medium">
												{user.name.charAt(0).toUpperCase()}
											</span>
										</div>
										{editingUser === user.id.toString() ? (
											<input
												type="text"
												value={editForm.name}
												onChange={(e) =>
													setEditForm((prev) => ({
														...prev,
														name: e.target.value,
													}))
												}
												className="text-sm border rounded px-2 py-1 focus:outline-none"
												autoFocus
											/>
										) : (
											<span className="text-sm font-medium">{user.name}</span>
										)}
									</div>
								</td>
								<td className="px-4 py-3 text-sm text-gray-900">
									{editingUser === user.id.toString() ? (
										<input
											type="tel"
											value={editForm.tel}
											onChange={(e) =>
												setEditForm((prev) => ({
													...prev,
													tel: e.target.value,
												}))
											}
											className="text-sm border rounded px-2 py-1"
										/>
									) : (
										user.tel
									)}
								</td>
								<td className="px-4 py-3 text-sm text-gray-900">
									{new Date(user.createdAt).toLocaleDateString("th-TH")}
								</td>
								<td className="px-4 py-3 text-right">
									<div className="flex justify-end gap-1">
										{editingUser === user.id.toString() ? (
											<>
												<button
													onClick={() =>
														handleSaveClick(user.id.toString())
													}
													disabled={isLoading}
													className="text-green-600 hover:text-green-900 p-1 disabled:opacity-50"
													title="บันทึก">
													{isLoading ? (
														<svg
															className="w-4 h-4 animate-spin"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24">
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
															/>
														</svg>
													) : (
														<svg
															className="w-4 h-4"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24">
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M5 13l4 4L19 7"
															/>
														</svg>
													)}
												</button>
												<button
													onClick={handleCancelEdit}
													disabled={isLoading}
													className="text-red-600 hover:text-red-900 p-1"
													title="ยกเลิก">
													<svg
														className="w-4 h-4"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M6 18L18 6M6 6l12 12"
														/>
													</svg>
												</button>
											</>
										) : (
											<>
												<button
													onClick={() => handleEditClick(user)}
													className="text-blue-600 hover:text-blue-900 p-1"
													title="แก้ไข">
													<svg
														className="w-4 h-4"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
														/>
													</svg>
												</button>
												<button
													onClick={() =>
														handleDeleteClick(user.id.toString())
													}
													className="text-red-600 hover:text-red-900 p-1"
													title="ลบ">
													<svg
														className="w-4 h-4"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</button>
											</>
										)}
									</div>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={5} className="px-4 py-8 text-center">
								<div className="flex flex-col items-center">
									<svg
										className="w-10 h-10 text-gray-400 mb-3"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
										/>
									</svg>
									<p className="text-sm text-gray-500 mb-2">ไม่มีข้อมูลผู้ใช้</p>
									<button
										onClick={() => setShowModal(true)}
										className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
										เพิ่มผู้ใช้แรก
									</button>
								</div>
							</td>
						</tr>
					)}
				</tbody>
			</table>{" "}
			{/* Delete Confirmation Modal */}
			{showDeleteConfirm && (
				<div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
						<h3 className="text-lg font-semibold mb-4">ยืนยันการลบผู้ใช้</h3>
						<p className="text-sm text-gray-700 mb-4">
							คุณแน่ใจหรือว่าต้องการลบผู้ใช้คนนี้? การกระทำนี้ไม่สามารถย้อนคืนได้
						</p>
						<div className="flex justify-end gap-2">
							<button
								onClick={() => handleConfirmDelete(showDeleteConfirm)}
								disabled={deletingUserId === showDeleteConfirm}
								className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50">
								{deletingUserId === showDeleteConfirm ? (
									<svg
										className="w-4 h-4 animate-spin"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
										/>
									</svg>
								) : (
									"ลบผู้ใช้"
								)}
							</button>
							<button
								onClick={handleCancelDelete}
								disabled={deletingUserId === showDeleteConfirm}
								className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50">
								ยกเลิก
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
