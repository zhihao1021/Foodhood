import axios from "axios";

import { Food } from "@/schemas/food";

export default async function getFoodList(): Promise<Array<Food>> {
    if (import.meta.env.DEV) {
        const randomString = `${Date.now()}${Math.random()}`;
        const tags = [0, 1, 2, 3, 4, 5, 6, 7];
        const centerLat = 22.9975432;
        const centetLng = 120.2214239;
        return Array.from(Array(10)).map((_, index) => ({
            uid: `${randomString}${index}`,
            authorId: "author123",
            title: `便當 ${index}`,
            description: `一個便當 ${index}`,
            includesVegetarian: Math.random() > 0.5,
            needTableware: Math.random() > 0.5,
            tags: tags.sort(() => Math.random()).slice(0, 1 + Math.floor((Math.random() * 7))),
            latitude: centerLat + (Math.random() - 0.5) / 24,
            longitude: centetLng + (Math.random() - 0.5) / 24,
            locationDescription: `資訊系館 ${Math.floor(Math.random() * 20) + 1} 樓`,
            validityPeriod: Math.floor(Math.random() * 24),
            imageCount: 0,
            createdAt: Date.now()
        }));
    }

    const response = await axios.get<Array<Food>>("/food");

    return response.data;
}