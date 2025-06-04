import axios from "axios";

export default async function updateAvatar(file: File): Promise<void> {
    const data = new FormData();
    data.append("file", file);

    await axios.post("/avatar", data);
}