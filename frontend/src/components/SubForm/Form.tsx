"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

import { Input } from "@/components/ui/input";

const fataSchema = z.object({
    name: z.string().min(2, {
        message: "ชื่ออย่างน้อย 2 ตัวอักษร",
    }),
    tel: z.string().min(10, {
        message: "เบอร์โทรศัพท์ต้องมีอย่างน้อย 10 หลัก",
    }),
    date: z.string().min(1, {
        message: "กรุณาเลือกวันที่",
    }),
    productType: z.string().min(1, {
        message: "กรุณาเลือกประเภทสินค้า",
    }),
    productModel: z.string().min(1, {
        message: "กรุณาเลือกรุ่นสินค้า",
    }),
    numberEngine: z.string().min(1, {
        message: "กรุณาใส่หมายเลขเครื่อง",
    }),
    tools: z.string().min(1, {
        message: "ไม่มีให้ใส่-",
    }),
    fixOrderNumber: z.string().min(1, {
        message: "ใส่เลขใบส่งซ่อม",
    }),
    responPerson: z.string().min(1, {
        message: "กรุณาเลือกผู้รับผิดชอบ",
    }),
    resportingRepairs: z.string().min(1, {
        message: "กรุณาใส่อาการแจ้งซ่อม",
    }),
    technicianFound: z.string().min(0, {
        message: "ใส่อาการที่ช่างพบ",
    }),
});

export function SubForm() {
    const form = useForm<z.infer<typeof fataSchema>>({
        resolver: zodResolver(fataSchema),
        defaultValues: {
            name: "",
            tel: "",
            date: "",
            productType: "",
            productModel: "",
            numberEngine: "",
            tools: "",
            fixOrderNumber: "",
            responPerson: "",
            resportingRepairs: "",
            technicianFound: "",
        },
    });

    const onSubmit = (data: z.infer<typeof fataSchema>) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
                autoComplete="off"
            >
                <FormDescription>
                    <h2 className="text-xl font-semibold text-gray-800">
                        ข้อมูลลูกค้า
                    </h2>
                </FormDescription>

                {/* ชื่อ */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ชื่อ</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-[500px]"
                                    placeholder="กรอกชื่อ-นามสกุลของคุณ"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* เบอร์โทร */}
                <FormField
                    control={form.control}
                    name="tel"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>เบอร์โทรศัพท์</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-[500px]"
                                    placeholder="กรอกเบอร์โทรศัพท์ของคุณ"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>กรอกวันที่ส่งซ่อม</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-[200px]"
                                    type="date"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormDescription>
                    <h2 className="text-xl font-semibold text-gray-800">
                        ข้อมูลสินค้า
                    </h2>
                </FormDescription>

                <div className="flex gap-20">
                    <FormField
                        control={form.control}
                        name="productType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ประเภทสินค้า</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-[300px]">
                                            <SelectValue placeholder="เลือกประเภทสินค้า" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="โทรศัพท์">
                                            โทรศัพท์
                                        </SelectItem>
                                        <SelectItem value="แท็บเล็ต">
                                            แท็บเล็ต
                                        </SelectItem>
                                        <SelectItem value="โน้ตบุ๊ค">
                                            โน้ตบุ๊ค
                                        </SelectItem>
                                        <SelectItem value="อุปกรณ์เสริม">
                                            อุปกรณ์เสริม
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="productType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ยี่ห้อสินค้า</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-[300px]">
                                            <SelectValue placeholder="เลือกประเภทสินค้า" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="โทรศัพท์">
                                            โทรศัพท์
                                        </SelectItem>
                                        <SelectItem value="แท็บเล็ต">
                                            แท็บเล็ต
                                        </SelectItem>
                                        <SelectItem value="โน้ตบุ๊ค">
                                            โน้ตบุ๊ค
                                        </SelectItem>
                                        <SelectItem value="อุปกรณ์เสริม">
                                            อุปกรณ์เสริม
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-20">
                    <FormField
                        control={form.control}
                        name="productModel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>รุ่นสินค้า</FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-[300px]"
                                        placeholder="เลือกรุ่นสินค้า"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="numberEngine"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>หมายเลขเครื่อง</FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-[300px]"
                                        placeholder="ใส่หมายเลขเครื่องของคุณ"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="tools"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>อุปกรณ์ที่ลูกค้าที่นำมา</FormLabel>
                            <FormControl>
                                <Input
                                    type="message"
                                    className="w-[800px]"
                                    placeholder="กรุณาใส่อุปกรณ์ที่ลูกค้านำมา เช่น กล่อง, สายชาร์จ, หูฟัง"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormDescription>
                    <h2 className="text-xl font-semibold text-gray-800">
                        ข้อมูลการซ่อม
                    </h2>
                </FormDescription>

                <div className="flex gap-10">
                    <FormField
                        control={form.control}
                        name="fixOrderNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>เลขใบรับซ่อม</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        className="w-[500px]"
                                        placeholder="ใส่เลขใบรับซ่อม"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="responPerson"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ผู้รับผิดชอบ</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-[300px]">
                                            <SelectValue placeholder="ผู้รับผิดชอบ" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="beam1">
                                            beam1
                                        </SelectItem>
                                        <SelectItem value="beam2">
                                            beam2
                                        </SelectItem>
                                        <SelectItem value="beam3">
                                            beam3
                                        </SelectItem>
                                        <SelectItem value="beam4">
                                            beam4
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="resportingRepairs"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>อาการแจ้งซ่อม</FormLabel>
                            <FormControl>
                                <Input
                                    type="message"
                                    className="w-[800px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="technicianFound"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>อาการที่ช่างพบ</FormLabel>
                            <FormControl>
                                <Input
                                    type="message"
                                    className="w-[800px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-5">

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>สถานะ</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-[200px]"></SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="beamcanfix">
                                            พังเละ
                                        </SelectItem>
                                        <SelectItem value="beamcanfix1">
                                            พังเละ
                                        </SelectItem>
                                        <SelectItem value="beamcanfix2">
                                            พังเละ
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                       <FormField
                    control={form.control}
                    name="priceFix"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ราคาซ่อม</FormLabel>
                            <FormControl>
                                <Input
                                    type="message"
                                    className="w-[200px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> 


                       <FormField
                    control={form.control}
                    name="deposit"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>เงินมัดจำ</FormLabel>
                            <FormControl>
                                <Input
                                    type="message"
                                    className="w-[200px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> 

                </div>

                <Button type="submit">บันทึก</Button>
            </form>
        </Form>
    );
}
