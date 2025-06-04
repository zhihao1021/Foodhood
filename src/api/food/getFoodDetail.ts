import axios from "axios";

import { Food } from "@/schemas/food";

export default async function getFoodDetail(uid: string): Promise<Food> {
    if (import.meta.env.VITE_DEBUG) {
        const data = (await import("@/test/data/foodList.json")).default;
        const { AxiosError } = await import("axios");

        const result = data.find(food => food.uid === uid);

        if (!result) throw new AxiosError("Food not found", "NOT_FOUND");

        await new Promise(resolve => setTimeout(resolve, 1000));
        return result;
    }

    const response = await axios.get<Food>(`/food/${uid}`);

    return response.data;
}