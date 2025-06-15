import React, { useEffect } from "react";

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
import { createProductSchema, type CreateProductInput } from "@/schemas/product";

// Services
import { toast } from "sonner";
import { Loader2, Package } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ProductTable from "./ProductTable";
import { ProductServices } from "@/services/productServices";

export function ProductForm() {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<CreateProductInput>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            name: "",
            price: 0,
            serial: "",
            quantity: 0,
            description: "",
            categoryId: 0,
            brandId: 0,
        },
    });

    const onSubmit = async (data: CreateProductInput) => {
        try {
            setIsSubmitting(true);

            await ProductServices.createProduct(data);
            console.log("Product data:", data);

            toast.success("สร้างสินค้าสำเร็จ!", {
                description: "เพิ่มสินค้าใหม่เรียบร้อยแล้ว",
                duration: 3000,
            });

            // Reset form
            form.reset();
        } catch (error) {
            toast.error("เกิดข้อผิดพลาด", {
                description: error instanceof Error ? error.message : "ไม่สามารถสร้างสินค้าได้",
                duration: 4000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchData = async () => {
        try {
            const res = await ProductServices.fetchProductData();
            console.log("Fetched product data:", res);
        } catch (error) {
            console.error("Error fetching product data:", error);
            toast.error("ไม่สามารถดึงข้อมูลสินค้าได้", {
                description: error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการดึงข้อมูล",
                duration: 4000,
            });
        }
    }

    useEffect(() => {
      fetchData();
    }, []);

    return (
        <>
            <Card className="my-2 shadow-sm">
                <CardHeader>
                    <CardTitle className="my-3 flex items-center gap-2 text-blue-900">
                        <Package size={20} />
                        เพิ่มสินค้าใหม่
                    </CardTitle>
                    <CardDescription>กรอกข้อมูลเพื่อเพิ่มสินค้าใหม่</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="my-4 grid grid-cols-2 gap-4 space-y-6">
                            {/* Name Field */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ชื่อสินค้า</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="กรอกชื่อสินค้า"
                                                disabled={isSubmitting}
                                                className="focus:border-regal-blue focus:ring-regal-blue"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Price Field */}
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ราคา</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="กรอกราคา"
                                                disabled={isSubmitting}
                                                className="focus:border-regal-blue focus:ring-regal-blue"
                                                {...field}
                                                onChange={e =>
                                                    field.onChange(Number(e.target.value))
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Serial Field */}
                            <FormField
                                control={form.control}
                                name="serial"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Serial Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="กรอก Serial Number"
                                                disabled={isSubmitting}
                                                className="focus:border-regal-blue focus:ring-regal-blue"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Quantity Field */}
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>จำนวน</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="กรอกจำนวน"
                                                disabled={isSubmitting}
                                                className="focus:border-regal-blue focus:ring-regal-blue"
                                                {...field}
                                                onChange={e =>
                                                    field.onChange(Number(e.target.value))
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description Field */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>คำอธิบาย</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="กรอกคำอธิบายสินค้า"
                                                disabled={isSubmitting}
                                                className="focus:border-regal-blue focus:ring-regal-blue"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category ID</FormLabel>
                                        <FormControl>
                                            <Select
                                                disabled={isSubmitting}
                                                value={field.value.toString()}
                                                onValueChange={value =>
                                                    field.onChange(Number(value))
                                                }>
                                                <SelectTrigger className="focus:border-regal-blue w-full">
                                                    <SelectValue placeholder="เลือก Category ID" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">Electronics</SelectItem>
                                                    <SelectItem value="2">Clothing</SelectItem>
                                                    <SelectItem value="3">Books</SelectItem>
                                                    <SelectItem value="4">Home & Garden</SelectItem>
                                                    <SelectItem value="5">Sports</SelectItem>
                                                    <SelectItem value="6">Toys</SelectItem>
                                                    <SelectItem value="7">Beauty</SelectItem>
                                                    <SelectItem value="8">Automotive</SelectItem>
                                                    <SelectItem value="9">Food</SelectItem>
                                                    <SelectItem value="10">Health</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="brandId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Brand ID</FormLabel>
                                        <FormControl>
                                            <Select
                                                disabled={isSubmitting}
                                                value={field.value.toString()}
                                                onValueChange={value =>
                                                    field.onChange(Number(value))
                                                }>
                                                <SelectTrigger className="focus:border-regal-blue w-full">
                                                    <SelectValue placeholder="เลือก Brand ID" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">Apple</SelectItem>
                                                    <SelectItem value="2">Samsung</SelectItem>
                                                    <SelectItem value="3">Sony</SelectItem>
                                                    <SelectItem value="4">LG</SelectItem>
                                                    <SelectItem value="5">Nike</SelectItem>
                                                    <SelectItem value="6">Adidas</SelectItem>
                                                    <SelectItem value="7">Canon</SelectItem>
                                                    <SelectItem value="8">Nikon</SelectItem>
                                                    <SelectItem value="9">Microsoft</SelectItem>
                                                    <SelectItem value="10">Dell</SelectItem>
                                                    <SelectItem value="11">HP</SelectItem>
                                                    <SelectItem value="12">Lenovo</SelectItem>
                                                    <SelectItem value="13">Asus</SelectItem>
                                                    <SelectItem value="14">Acer</SelectItem>
                                                    <SelectItem value="15">Puma</SelectItem>
                                                    <SelectItem value="16">Under Armour</SelectItem>
                                                    <SelectItem value="17">Reebok</SelectItem>
                                                    <SelectItem value="18">New Balance</SelectItem>
                                                    <SelectItem value="19">Converse</SelectItem>
                                                    <SelectItem value="20">Vans</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <div className="flex items-center justify-start">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="bg-regal-blue hover:bg-regal-blue/90 w-full text-white"
                                    disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            กำลังเพิ่ม...
                                        </>
                                    ) : (
                                        <>
                                            <Package className="mr-2 h-4 w-4" />
                                            เพิ่มสินค้า
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* Product Table to display existing products */}
            <ProductTable />
        </>
    );
}
