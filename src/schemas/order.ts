export interface Order {
    uid: string,
    foodId: string,
    userId: string,
    received: boolean, // 已領取
    complete: boolean  // 已分發完
}

export interface OrderUpdate {
    received?: boolean,
    complete?: boolean,
}
