import { useEffect } from "react";
import { useUserStore } from "@/store";
import { User } from "@/types";
import { UserIcon } from "@heroicons/react/24/outline";
import UserDetail from "./userDetail/UserDetail";
import UserTableHeader from "./userDetail/UserTableHeader";
import { showSuccessToast } from "@/lib/toast";
import RefreshButton from "../../RefreshButton";
import UserCreate from "./userDetail/UserCreate";

const UserTable = () => {
  const users = useUserStore((state) => state.users);
  const fetchUsers = useUserStore((state) => state.fetchUsers);

  const data = users?.data || [];
  const message = users?.message;

  useEffect(() => {
    if (message) {
      showSuccessToast(message);
    }
  }, [message]);

  return (
    <div className="p-4 bg-white shadow">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center">
          <UserIcon className="w-6 h-6 mr-3 text-blue-600" />
          User Management
        </h2>
        <div className="flex items-center gap-4">
          <UserCreate />
          <RefreshButton onRefresh={fetchUsers} />
        </div>
      </div>
      <div className="border-1 border-gray-200">
        <table className="w-full divide-y divide-gray-300 ">
          <UserTableHeader />
          <tbody className="bg-white divide-y divide-gray-100 cursor-pointer">
            {data.map((user: User, index: number) => (
              <UserDetail key={user.id} user={user} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
