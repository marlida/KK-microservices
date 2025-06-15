import { Card } from "../ui/card";

function PageTitle({ title }: { title: string }) {
    return (
        <Card>
            <div>
                <h1 className="text-regal-blue font-bold text-xl dark:text-white">{title}</h1>
            </div>
        </Card>
    );
}
export default PageTitle;
