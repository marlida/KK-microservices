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
import { updateUserSchema, type UpdateUserInput } from "../../../../schemas/users";

// Types and Services
import { User } from "@/types/user";
import { UserServices } from "@/services/userServices";
import { toast } from "sonner";
import { SquarePen, Loader2, Save } from "lucide-react";

interface UserEditProps {
    user: User;
    onUpdateSuccess?: () => void;
}

export function UserEdit({ user, onUpdateSuccess }: UserEditProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<UpdateUserInput>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            id: user.id.toString(),
            name: user.name,
            tel: user.tel,
        },
    });

    const onSubmit = async (data: UpdateUserInput) => {
        try {
            setIsSubmitting(true);

            await UserServices.updateUser(data.id, {
                name: data.name,
                tel: data.tel,
            });

            toast.success("สำเร็จ!", {
                description: "ข้อมูลผู้ใช้ได้รับการอัปเดตเรียบร้อยแล้ว",
                duration: 3000,
            });

            setIsOpen(false);

            // Call parent callback to refresh data
            if (onUpdateSuccess) {
                onUpdateSuccess();
            }
        } catch (error) {
            console.error("User update error:", error);
            toast.error("เกิดข้อผิดพลาด", {
                description:
                    error instanceof Error ? error.message : "ไม่สามารถอัปเดตข้อมูลผู้ใช้ได้",
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
                id: user.id.toString(),
                name: user.name,
                tel: user.tel,
            });
        }
    }, [isOpen, user, form]);

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
                        แก้ไขข้อมูลผู้ใช้
                    </DialogTitle>
                    <DialogDescription>
                        แก้ไขข้อมูลผู้ใช้ ระบบจะตรวจสอบข้อมูลอัตโนมัติ
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
                                    <FormLabel>ชื่อผู้ใช้</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="กรอกชื่อผู้ใช้"
                                            disabled={isSubmitting}
                                            className="focus:border-blue-500 focus:ring-blue-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        ชื่อจริงของผู้ใช้ 2-100 ตัวอักษร
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
                        <div className="flex flex-col-reverse pt-4 sm:flex-row sm:justify-end sm:space-x-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                                disabled={isSubmitting}
                                className="mt-2 sm:mt-0">
                                ยกเลิก
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-regal-blue hover:bg-regal-blue/90">
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
