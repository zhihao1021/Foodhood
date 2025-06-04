import { UserUpdate } from "@/schemas/user";
import axios from "axios";

export default async function updateUserData(data: UserUpdate): Promise<void> {
    await axios.put("/user", data);
}