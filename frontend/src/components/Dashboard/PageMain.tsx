import { Card } from "../ui/card";
import { Admin } from "../files/components/Admin/AdminForm";

function PageMain() {
    return (
        <div className="p-4">
            <Card className="rounded-md">
                <Admin />
            </Card>
        </div>
    );
}
export default PageMain;
