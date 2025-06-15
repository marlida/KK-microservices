import React from "react";

// React Hook Form
import { useForm } from "react-hook-form";

// Validation schema
import { z } from "zod";
import { formSchema } from "@/types/admin";
import { zodResolver } from "@hookform/resolvers/zod";

// UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

// Components
import AdminTable from "./AdminTable";

// Services
import { AdminServices } from "@/services/adminServices";

export function AdminForm() {
    // State to manage form data and messages
    const [message, setMessage] = React.useState<string | null>(null);

    // Initialize the form with validation schema
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            tel: "",
        },
    });

    // Function to handle form submission
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const res = await AdminServices.createAdmin(data);
            await AdminServices.fetchAdminData();
            setMessage(res);
            form.reset();
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage("เกิดข้อผิดพลาดในการส่งข้อมูล");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" autoComplete="off">
                <FormDescription>สร้างฟอร์มสำหรับกรอกข้อมูลผู้ดูแลระบบ</FormDescription>

                {/* Form fields for name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ชื่อ</FormLabel>
                            <FormControl>
                                <Input placeholder="กรอกชื่อของคุณ" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Form field for telephone */}
                <FormField
                    control={form.control}
                    name="tel"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>เบอร์โทรศัพท์</FormLabel>
                            <FormControl>
                                <Input placeholder="กรอกเบอร์โทรศัพท์ของคุณ" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit button */}
                <Button type="submit" className="bg-purple-900 hover:bg-purple-800">
                    ส่งข้อมูล
                </Button>
                {message && <div className="text-sm text-green-600">{message}</div>}
            </form>

            {/* Admin Table to display existing admins */}
            <AdminTable />
        </Form>
    );
}
