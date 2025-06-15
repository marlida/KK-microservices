import React from "react";

// Form components (shadcn/ui)
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

// UI components
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Form handling
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAdminSchema, type UpdateAdminInput } from "../../../../schemas/admin";

// Types and Services
import { Admin } from "@/types/admin";
import { AdminServices } from "@/services/adminServices";
import { toast } from "sonner";
import { SquarePen, Loader2, Save } from "lucide-react";

interface AdminEditProps {
    admin: Admin;
    onUpdateSuccess?: () => void;
}

export function AdminEdit({ admin, onUpdateSuccess }: AdminEditProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<UpdateAdminInput>({
        resolver: zodResolver(updateAdminSchema),
        defaultValues: {
            id: admin.id.toString(),
            name: admin.name,
            tel: admin.tel,
        },
    });

    const onSubmit = async (data: UpdateAdminInput) => {
        try {
            setIsSubmitting(true);

            await AdminServices.updateAdmin(data.id, {
                name: data.name,
                tel: data.tel,
            });

            toast.success("สำเร็จ!", {
                description: "ข้อมูลผู้ดูแลระบบได้รับการอัปเดตเรียบร้อยแล้ว",
                duration: 3000,
            });

            setIsOpen(false);
            
            // Call parent callback to refresh data
            if (onUpdateSuccess) {
                onUpdateSuccess();
            }

        } catch (error) {
            console.error('Admin update error:', error);
            toast.error("เกิดข้อผิดพลาด", {
                description: error instanceof Error 
                    ? error.message 
                    : "ไม่สามารถอัปเดตข้อมูลผู้ดูแลระบบได้",
                duration: 4000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reset form when dialog opens
    React.useEffect(() => {
        if (isOpen) {
            form.reset({
                id: admin.id.toString(),
                name: admin.name,
                tel: admin.tel,
            });
        }
    }, [isOpen, admin, form]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <SquarePen size={16} strokeWidth={1.2} color="blue" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <SquarePen size={20} className="text-blue-600" />
                        แก้ไขข้อมูลผู้ดูแลระบบ
                    </DialogTitle>
                    <DialogDescription>
                        แก้ไขข้อมูลผู้ดูแลระบบ ระบบจะตรวจสอบข้อมูลอัตโนมัติ
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Hidden ID field */}
                        <input type="hidden" {...form.register("id")} />

                        {/* Name Field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ชื่อผู้ดูแลระบบ</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="กรอกชื่อผู้ดูแลระบบ"
                                            disabled={isSubmitting}
                                            className="focus:border-blue-500 focus:ring-blue-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        ชื่อจริงของผู้ดูแลระบบ 2-100 ตัวอักษร
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Telephone Field */}
                        <FormField
                            control={form.control}
                            name="tel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>เบอร์โทรศัพท์</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="กรอกเบอร์โทรศัพท์ (เช่น 0812345678)"
                                            disabled={isSubmitting}
                                            className="focus:border-blue-500 focus:ring-blue-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        เบอร์โทรศัพท์ 10 หลัก ขึ้นต้นด้วย 0
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Form Actions */}
                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                                disabled={isSubmitting}
                                className="mt-2 sm:mt-0"
                            >
                                ยกเลิก
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-regal-blue hover:bg-regal-blue/90"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        กำลังบันทึก...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        บันทึกการเปลี่ยนแปลง
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
