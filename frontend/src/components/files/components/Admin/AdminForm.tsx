import React from "react";

// Form components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

// UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Form handling
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAdminSchema, type CreateAdminInput } from "../../../../schemas/admin";

// Components
import AdminTable from "./AdminTable";

// Services
import { AdminServices } from "@/services/adminServices";
import { toast } from "sonner";
import { Loader2, UserPlus } from "lucide-react";

export function AdminForm() {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<CreateAdminInput>({
        resolver: zodResolver(createAdminSchema),
        defaultValues: {
            name: "",
            tel: "",
        },
    });

    const onSubmit = async (data: CreateAdminInput) => {
        try {
            setIsSubmitting(true);

            await AdminServices.createAdmin(data);

            toast.success("สร้างโปรไฟล์สำเร็จ!", {
                description: "สร้างผู้ดูแลระบบเรียบร้อยแล้ว",
                duration: 3000,
            });

            // Reset form
            form.reset();
        } catch (error) {
            toast.error("เกิดข้อผิดพลาด", {
                description:
                    error instanceof Error ? error.message : "ไม่สามารถสร้างผู้ดูแลระบบได้",
                duration: 4000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Card className="my-2 shadow-sm">
                <CardHeader>
                    <CardTitle className="my-3 flex items-center gap-2 text-blue-900">
                        <UserPlus size={20} />
                        เพิ่มผู้ดูแลระบบใหม่
                    </CardTitle>
                    <CardDescription>กรอกข้อมูลเพื่อสร้างบัญชีผู้ดูแลระบบใหม่</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 my-4">
                            {/* Name Field */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ชื่อ</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="กรอกชื่อของคุณ"
                                                disabled={isSubmitting}
                                                className="focus:border-purple-500 focus:ring-purple-500"
                                                {...field}
                                            />
                                        </FormControl>
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
                                                placeholder="กรอกเบอร์โทรศัพท์"
                                                disabled={isSubmitting}
                                                className="focus:border-purple-500 focus:ring-purple-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <div className="mx-auto max-w-md">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="mb-4 w-full bg-regal-blue hover:bg-regal-blue/90 text-white"
                                    disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            กำลังสร้าง...
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="mr-2 h-4 w-4" />
                                            สร้างผู้ดูแลระบบ
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* Admin Table to display existing admins */}
            <AdminTable />
        </>
    );
}
