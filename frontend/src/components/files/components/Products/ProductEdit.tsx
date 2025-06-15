import React from "react";

// Form components (shadcn/ui)
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
import { updateProductSchema, type UpdateProductInput } from "@/schemas/product";

// Types and Services
import { Product } from "@/types/product";
import { ProductServices } from "@/services/productServices";
import { toast } from "sonner";
import { SquarePen, Loader2, Save } from "lucide-react";

interface ProductEditProps {
    product: Product;
    onUpdateSuccess?: () => void;
}

export function ProductEdit({ product, onUpdateSuccess }: ProductEditProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<UpdateProductInput>({
        resolver: zodResolver(updateProductSchema),
        defaultValues: {
            name: product.name,
            price: product.price,
            serial: product.serial,
            quantity: product.quantity,
            description: product.description,
            categoryId: product.categoryId,
            brandId: product.brandId,
        },
    });

    const onSubmit = async (data: UpdateProductInput) => {
        try {
            setIsSubmitting(true);

            await ProductServices.updateProduct(data.id, {
                name: data.name,
                price: data.price,
                serial: data.serial,
                quantity: data.quantity,
                description: data.description,
                categoryId: data.categoryId,
                brandId: data.brandId,
            });

            toast.success("สำเร็จ!", {
                description: "ข้อมูลสินค้าได้รับการอัปเดตเรียบร้อยแล้ว",
                duration: 3000,
            });

            setIsOpen(false);

            // Call parent callback to refresh data
            if (onUpdateSuccess) {
                onUpdateSuccess();
            }
        } catch (error) {
            console.error("Product update error:", error);
            toast.error("เกิดข้อผิดพลาด", {
                description:
                    error instanceof Error ? error.message : "ไม่สามารถอัปเดตข้อมูลสินค้าได้",
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
                name: product.name,
                price: product.price,
                serial: product.serial,
                quantity: product.quantity,
                description: product.description,
                categoryId: product.categoryId,
                brandId: product.brandId,
            });
        }
    }, [isOpen, product, form]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <SquarePen size={16} strokeWidth={1.2} color="blue" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <SquarePen size={20} className="text-blue-600" />
                        แก้ไขข้อมูลสินค้า
                    </DialogTitle>
                    <DialogDescription>
                        แก้ไขข้อมูลสินค้า ระบบจะตรวจสอบข้อมูลอัตโนมัติ
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Hidden ID field */}
                        <input type="hidden" {...form.register("id")} />

                        <div className="grid grid-cols-2 gap-4">
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
                                                className="focus:border-blue-500 focus:ring-blue-500"
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
                                                className="focus:border-blue-500 focus:ring-blue-500"
                                                {...field}
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
                                        <FormLabel>หมายเลขซีเรียล</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="กรอกหมายเลขซีเรียล"
                                                disabled={isSubmitting}
                                                className="focus:border-blue-500 focus:ring-blue-500"
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
                                        <FormLabel>จำนวนคงเหลือ</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="กรอกจำนวนคงเหลือ"
                                                disabled={isSubmitting}
                                                className="focus:border-blue-500 focus:ring-blue-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Category ID Field */}
                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="กรอก Category ID"
                                                disabled={isSubmitting}
                                                className="focus:border-blue-500 focus:ring-blue-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Brand ID Field */}
                            <FormField
                                control={form.control}
                                name="brandId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Brand ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="กรอก Brand ID"
                                                disabled={isSubmitting}
                                                className="focus:border-blue-500 focus:ring-blue-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

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
                                            className="focus:border-blue-500 focus:ring-blue-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <div className="flex justify-end gap-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                                disabled={isSubmitting}>
                                ยกเลิก
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700">
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
