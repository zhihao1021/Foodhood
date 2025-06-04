import { OrderUpdate } from "@/schemas/order";
import axios from "axios";

export default async function finishOrder(uid: string, data: OrderUpdate): Promise<void> {
    return axios.put(`/order/${uid}`, data);
}