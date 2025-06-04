export interface Food {
    uid: string,
    authorId: string
    title: string,
    description: string,
    includesVegetarian: boolean,
    needTableware: boolean,
    tags: number[],
    latitude: number,
    longitude: number,
    locationDescription: string,
    validityPeriod: number,
    imageCount: number,
    createdAt: number,
}

export interface FoodCreate {
    title: string,
    description: string,
    includesVegetarian: boolean,
    needTableware: boolean,
    tags: number[],
    latitude: number,
    longitude: number,
    locationDescription: string,
    validityPeriod: number,
    createdAt: number,
}