import { User } from "@/types/types";
import { useState } from "react";
import CreateUser from "./UserDetail/CreateUser";
import SearchFilter from "./UserDetail/SearchFilter";
import SearchTerm from "./UserDetail/SearchTerm";
import TableUser from "./UserDetail/TableUser";
import Pagination from "./UserDetail/Pagination";
import UserHeader from "./UserDetail/UserHeader";
import { createUser } from "@/services/ServiceUser";

interface UserProps {
	activeTab: string;
	users: User[];
}

export default function UserComponent({ activeTab, users }: UserProps) {
	const safeUsers = Array.isArray(users) ? users : [];

	const [showModal, setShowModal] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		tel: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [dateFilter, setDateFilter] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const filteredUsers = safeUsers.filter((user) => {
		const matchesSearch =
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.tel.includes(searchTerm);

		let matchesDate = true;
		if (dateFilter) {
			const userDate = new Date(user.createdAt);
			const today = new Date();

			switch (dateFilter) {
				case "today":
					matchesDate = userDate.toDateString() === today.toDateString();
					break;
				case "week":
					const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
					matchesDate = userDate >= weekAgo;
					break;
				case "month":
					const monthAgo = new Date(
						today.getFullYear(),
						today.getMonth() - 1,
						today.getDate(),
					);
					matchesDate = userDate >= monthAgo;
					break;
				default:
					matchesDate = true;
			}
		}
		return matchesSearch && matchesDate;
	});

	const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

	// Reset pagination when filters change
	const handleSearchChange = (term: string) => {
		setSearchTerm(term);
		setCurrentPage(1);
	};

	const handleDateFilterChange = (filter: string) => {
		setDateFilter(filter);
		setCurrentPage(1);
	};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			await createUser(formData);
			setFormData({ name: "", tel: "" });
			setShowModal(false);
			window.location.reload();
		} catch (error) {
			console.error("Error adding user:", error);
			alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const closeModal = () => {
		setFormData({ name: "", tel: "" });
		setShowModal(false);
	};

	return (
		<div>
			{activeTab === "users" && (
				<div className="bg-white rounded-lg shadow overflow-hidden">
					<UserHeader onAddUser={() => setShowModal(true)} />

					<CreateUser
						showModal={showModal}
						closeModal={closeModal}
						handleSubmit={handleSubmit}
						formData={formData}
						handleInputChange={handleInputChange}
						isSubmitting={isSubmitting}
					/>

					<SearchFilter
						searchTerm={searchTerm}
						dateFilter={dateFilter}
						setSearchTerm={handleSearchChange}
						setDateFilter={handleDateFilterChange}
						filteredUsers={filteredUsers}
						totalUsers={safeUsers.length}
					/>

					<SearchTerm
						searchTerm={searchTerm}
						filteredUsers={filteredUsers}
						currentPage={currentPage}
						totalPages={totalPages}
						setSearchTerm={setSearchTerm}
					/>

					<TableUser safeUsers={paginatedUsers} setShowModal={setShowModal} />

					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						totalItems={safeUsers.length}
						filteredItems={filteredUsers.length}
						onPageChange={setCurrentPage}
					/>
				</div>
			)}
		</div>
	);
}
