import axios from "axios";

import { Food } from "@/schemas/food";

export default async function getFoodList(): Promise<Array<Food>> {
    if (import.meta.env.VITE_DEBUG) {
        const data = (await import("@/test/data/foodList.json")).default;

        await new Promise(resolve => setTimeout(resolve, 1000));
        return data;
    }

    const response = await axios.get<Array<Food>>("/food");

    return response.data;
}