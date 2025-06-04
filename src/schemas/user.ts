export interface User {
    uid: string,
    email: string,
    username: string,
    phone: string,
}

export interface UserCreate {
    email: string,
    username: string,
    phone: string,
    password: string
}

export interface UserUpdate {
    email?: string,
    username?: string,
    phone?: string,
    password?: string,
    originalPassword?: string
}
