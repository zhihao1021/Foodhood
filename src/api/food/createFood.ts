import axios from "axios";

import { Food, FoodCreate } from "@/schemas/food";

export default async function createFood(data: FoodCreate): Promise<Food> {
    if (import.meta.env.VITE_DEBUG) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            uid: "123123",
            authorId: "author123123",
            title: data.title,
            description: data.description,
            includesVegetarian: data.includesVegetarian,
            needTableware: data.needTableware,
            tags: data.tags,
            latitude: data.latitude,
            longitude: data.longitude,
            locationDescription: data.locationDescription,
            validityPeriod: data.validityPeriod,
            imageCount: 0,
            createdAt: data.createdAt
        }
    }

    const response = await axios.post<Food>("/food", data);

    return response.data;
}