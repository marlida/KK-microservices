interface CreateUserProps {
	showModal: boolean;
	closeModal: () => void;
	handleSubmit: (e: React.FormEvent) => void;
	formData: { name: string; tel: string };
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isSubmitting: boolean;
}

export default function CreateUser({
	showModal,
	closeModal,
	handleSubmit,
	formData,
	handleInputChange,
	isSubmitting
}: CreateUserProps) {
  return (
    <div>
        {showModal && (
						<div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
							<div className="bg-white p-6 rounded-lg w-96 max-w-lg mx-4">
								<div className="flex justify-between items-center mb-4">
									<h3 className="text-lg font-medium text-gray-900">เพิ่มผู้ใช้ใหม่</h3>
									<button
										onClick={closeModal}
										className="text-gray-400 hover:text-gray-600"
									>
										<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
										</svg>
									</button>
								</div>
								
								<form onSubmit={handleSubmit}>
									<div className="mb-4">
										<label className="block text-sm font-medium text-gray-700 mb-2">
											ชื่อผู้ใช้ <span className="text-red-500">*</span>
										</label>
										<input
											type="text"
											name="name"
											value={formData.name}
											onChange={handleInputChange}
											required
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="กรุณากรอกชื่อผู้ใช้"
										/>
									</div>
									
									<div className="mb-6">
										<label className="block text-sm font-medium text-gray-700 mb-2">
											เบอร์โทรศัพท์ <span className="text-red-500">*</span>
										</label>
										<input
											type="tel"
											name="tel"
											value={formData.tel}
											onChange={handleInputChange}
											required
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="กรุณากรอกเบอร์โทรศัพท์"
										/>
									</div>
									
									<div className="flex gap-3">
										<button
											type="button"
											onClick={closeModal}
											className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
										>
											ยกเลิก
										</button>
										<button
											type="submit"
											disabled={isSubmitting}
											className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
										>
											{isSubmitting ? "กำลังเพิ่ม..." : "เพิ่มผู้ใช้"}
										</button>
									</div>
								</form>
							</div>
						</div>
					)}
    </div>
  )
}