import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Admin } from "@/types/admin";
import { SquarePen } from "lucide-react";

interface AdminEditProps {
    admin: Admin;
}

export function AdminEdit({ admin }: AdminEditProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <SquarePen strokeWidth={1.2} color="blue" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form>
                    <DialogHeader>
                        <DialogTitle>แก้ไขข้อมูลผู้ดูแลระบบ</DialogTitle>
                        <DialogDescription>
                            แก้ไขข้อมูลผู้ดูแลระบบ คลิกบันทึกเมื่อเสร็จสิ้น
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">ชื่อผู้ดูแลระบบ</Label>
                            <Input id="name" name="name" defaultValue={admin.name} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="tel">เบอร์โทรศัพท์</Label>
                            <Input id="tel" name="tel" defaultValue={admin.tel} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">ยกเลิก</Button>
                        </DialogClose>
                        <Button type="submit">บันทึกการเปลี่ยนแปลง</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
