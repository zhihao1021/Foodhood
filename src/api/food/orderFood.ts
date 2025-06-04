import { Order } from "@/schemas/order";
import axios from "axios";

export default async function orderFood(uid: string): Promise<Order> {
    if (import.meta.env.VITE_DEBUG) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            uid: "uid123",
            foodId: uid,
            userId: "user123",
            received: false,
            complete: false
        }
    }

    const response = await axios.get<Order>(`/food/${uid}/order`);

    return response.data;
}