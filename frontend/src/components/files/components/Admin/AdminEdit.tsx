import React from "react";
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
import { useFormState } from "react-dom";
import { submitForm } from "./action";
import { toast } from "sonner";

interface AdminEditProps {
    admin: Admin;
}

interface InitialState {
    success: boolean;
    message: string;
}

const initialState: InitialState = {
    success: false,
    message: "",
};

export function AdminEdit({ admin }: AdminEditProps) {
    const [state = initialState, formAction] = React.useActionState(submitForm, initialState);

    React.useEffect(() => {
        if (state.success) {
            toast(state.message, {
                description: "ข้อมูลผู้ดูแลระบบได้รับการอัปเดตเรียบร้อยแล้ว",
                duration: 3000,
            });
        }
    }, [state.success]);

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <SquarePen strokeWidth={1.2} color="blue" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form action={formAction}>
                        <input type="hidden" name="id" value={admin.id} />

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
        </>
    );
}
