import axios from "axios";

import { User } from "@/schemas/user";

export default async function getUserData(uid?: string): Promise<User> {
    if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            uid: uid ?? "123456",
            email: "user@example.com",
            phone: "0912345678",
            username: "user"
        }
    }

    const response = await axios.get<User>(uid ? `/user/${uid}` : "/user");

    return response.data;
}