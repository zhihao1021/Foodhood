// import axios from "axios";

import { User } from "@/schemas/user";

export default async function getUserData(): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        uid: "123456",
        email: "user@example.com",
        phone: "0912345678",
        username: "user"
    }

    // const response = await axios.get<User>("/user");

    // return response.data;
}