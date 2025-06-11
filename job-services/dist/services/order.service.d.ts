import { Order } from "../types/order";
export declare class orderService {
    static decreaseProductQuantity: (productId: number, quantity: number) => Promise<void>;
    static createOrder: (orderData: {
        name: string;
        adminId: number;
        userId: number;
        productId: number;
        quantity: number;
        status: string;
        customer_issue: string;
        technician_issue: string;
        deposit: number;
        total: number;
    }) => Promise<Order>;
    static getOrder: () => Promise<Order[]>;
    static getOrderById: (id: number) => Promise<Order | null>;
    static getOrderExists: (orderNumber: string) => Promise<Order | null>;
    static updateOrder: ({ id }: {
        id: number;
    }, orderData: {
        name: string;
        adminId: number;
        productId: number;
        status: string;
        customer_issue: string;
        technician_issue: string;
        deposit: number;
        total: number;
    }) => Promise<Order>;
    static deleteOrder: (id: number) => Promise<Order>;
}
