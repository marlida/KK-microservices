function Topbar() {
    return (
        <header className="flex items-center justify-between bg-blue-900 p-4 text-white">
            <div>KK || SERVICE</div>
            <div>
                <span className="text-white">
                    Welcome to the service portal
                </span>
                <span className="ml-4 text-white">User: John Doe</span>
                <span className="ml-4 text-white">Role: Admin</span>
                <span className="ml-4 text-white">Last Login: 2023-10-01</span>
            </div>
        </header>
    );
}
export default Topbar;
