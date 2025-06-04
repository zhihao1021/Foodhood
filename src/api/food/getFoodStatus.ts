import axios from "axios";

import { Order } from "@/schemas/order";

export default async function getFoodStatus(uid: string): Promise<Array<Order>> {
    if (import.meta.env.VITE_DEBUG) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return Array.from({ length: 10 }, (_, i) => ({
            uid: `order${i + 1}`,
            foodId: uid,
            userId: i === 1 && Math.random() > 0.1 ? "123456" : `user${i + 1}`,
            received: Math.random() > 0.5,
            complete: Math.random() > 0.5
        }));
    }

    const response = await axios.get<Array<Order>>(`/food/${uid}/status`);

    return response.data;
}