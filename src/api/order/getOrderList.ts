import axios from "axios";

import { Order } from "@/schemas/order";

export default async function getOrderList(): Promise<Array<Order>> {
    if (import.meta.env.VITE_DEBUG) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const data = (await import("@/test/data/foodList.json")).default;

        return Array.from({ length: 3 }, (_, i) => ({
            uid: `order${i + 1}`,
            foodId: data[i % data.length].uid,
            userId: `user${i + 1}`,
            received: Math.random() > 0.5,
            complete: Math.random() > 0.5
        }));
    }

    const response = await axios.get<Array<Order>>("/order");

    return response.data;
}