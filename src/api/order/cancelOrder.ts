import axios from "axios";

export default async function cancelOrder(uid: string): Promise<void> {
    await axios.delete(`/order/${uid}`)
}