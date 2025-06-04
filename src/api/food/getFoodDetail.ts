import Food from "@/schemas/food";

export default async function getFoodDetail(foodId: string): Promise<Food> {
    const tags = [0, 1, 2, 3, 4, 5, 6, 7];
    const centerLat = 22.9975432;
    const centetLng = 120.2214239;

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
        id: foodId,
        title: "便當",
        description: "一個便當",
        includesVegetarian: Math.random() > 0.5,
        needTableware: Math.random() > 0.5,
        tags: tags.sort(() => Math.random()).slice(0, 1 + Math.floor((Math.random() * 7))),
        // latitude: centerLat + (Math.random() - 0.5) / 24,
        // longitude: centetLng + (Math.random() - 0.5) / 24,
        latitude: centerLat,
        longitude: centetLng,
        locationDescription: `資訊系館 ${Math.floor(Math.random() * 20) + 1} 樓`,
        validityPeriod: Math.floor(Math.random() * 24),
        imageCount: 0,
        createdAt: Date.now()
    }
}