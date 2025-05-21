import Food from "@/schemas/food";
// import axios from "axios";

export default async function getData(options: {
    offset?: number,
    limit?: number,
}): Promise<Array<Food>> {
    const {
        // offset,
        limit
    } = options;

    const randomString = `${Date.now()}${Math.random()}`;
    const tags = [0, 1, 2, 3, 4, 5, 6, 7];
    const centerLat = 22.9975432;
    const centetLng = 120.2214239;
    return Array.from(Array(limit)).map((_, index) => ({
        id: `${randomString}${index}`,
        title: `便當 ${index}`,
        description: `一個便當 ${index}`,
        includesVegetarian: Math.random() > 0.5,
        needTableware: Math.random() > 0.5,
        tags: tags.sort(() => Math.random()).slice(0, 1 + Math.floor((Math.random() * 7))),
        latitude: centerLat + (Math.random() - 0.5) / 24,
        longitude: centetLng + (Math.random() - 0.5) / 24,
        locationDescription: `資訊系館 ${Math.floor(Math.random() * 20) + 1} 樓`,
        validityPeriod: Math.floor(Math.random() * 24),
        imageCount: 0
    }));

    // let requestUrl = "/food?"
    // if (offset) requestUrl += `offset=${offset}&`;

    // if (limit) requestUrl += `limit=${limit}`;

    // const response = await axios.get<Array<Food>>(requestUrl);

    // return response.data;
}