import { Card } from "../ui/card";

function PageMain() {
    return (
        <div className="p-4">
            <Card className="rounded-md">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                    <p>Welcome to the dashboard! Here you can manage your application.</p>
                </div>
            </Card>
        </div>
    );
}
export default PageMain;
