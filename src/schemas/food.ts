export default interface Food {
    id: string,
    title: string,
    description: string,
    includesVegetarian: boolean,
    needTableware: boolean,
    tags: number[],
    latitude: number,
    longitude: number,
    locationDescription: string,
    validityPeriod: number,
    imageCount: number
}