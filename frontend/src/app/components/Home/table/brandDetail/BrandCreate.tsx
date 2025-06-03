import { useState, FC, FormEvent } from "react";
import { useBrandStore } from "@/store";
import { Brand } from "@/types";
import { PlusIcon } from "@heroicons/react/24/outline";

type BrandCreateData = Pick<Brand, "name">;

const BrandCreate: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState<BrandCreateData>({ name: "" });
	const [message, setMessage] = useState<string>("");
	const createBrand = useBrandStore((state) => state.createBrand);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!formData.name) {
			setMessage("Please enter brand name.");
			return;
		}

		await createBrand(formData as Brand);
		setIsOpen(false);
		setFormData({ name: "" });
	};

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium border border-blue-200 hover:border-blue-300 cursor-pointer">
				<PlusIcon className="w-4 h-4" />
				Create Brand
			</button>

			<div
				className={`fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center ${
					isOpen ? "visible" : "invisible"
				} transition-all duration-300`}>
				<div
					className={`bg-white p-6 rounded-lg shadow-lg w-96 transition-transform duration-300 transform ${
						isOpen ? "scale-100" : "scale-95"
					}`}>
					<div className="space-y-6">
						<h2 className="text-2xl font-semibold text-gray-900">Create Brand</h2>

						<form onSubmit={handleSubmit} className="space-y-5">
							<div className="space-y-2">
								<label className="text-sm font-medium text-gray-700">Name</label>
								<input
									type="text"
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									placeholder="Enter brand name"
								/>
							</div>

							{message && <div className="text-red-600 text-sm mt-2">{message}</div>}

							<div className="flex gap-3 pt-4">
								<button
									type="button"
									onClick={() => setIsOpen(false)}
									className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors font-medium cursor-pointer">
									Cancel
								</button>
								<button
									type="submit"
									className="flex-1 px-4 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors font-medium cursor-pointer">
									Create
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default BrandCreate;
