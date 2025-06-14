"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "ชื่ออย่างน้อย 2 ตัวอักษร",
    }),
    tel: z.string().min(10, {
        message: "เบอร์โทรศัพท์ต้องมีอย่างน้อย 10 หลัก",
    }),
});

export function AdminForm() {
    const [data, setData] = React.useState<z.infer<typeof formSchema> | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            tel: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setData(data);
    };

    React.useEffect(() => {
        if (data) {
            console.log("Submitted Data:", data);
        }
    }, [data]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" autoComplete="off">
                <FormDescription>สร้างฟอร์มสำหรับกรอกข้อมูลผู้ดูแลระบบ</FormDescription>
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
                <Button type="submit">ส่งข้อมูล</Button>
            </form>
        </Form>
    );
}
