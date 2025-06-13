import { Card } from "../ui/card";

function PageTitle({ title }: { title: string }) {
    return (
        <Card>
            <div>
                <h1 className="text-gray-800 font-semibold">{title}</h1>
            </div>
        </Card>
    );
}
export default PageTitle;
