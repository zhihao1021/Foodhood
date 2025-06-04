import axios from "axios";

export default async function uploadFoodPhotos(uid: string, photos: File[]): Promise<void> {
    const form = new FormData();
    photos.forEach(photo => form.append("file[]", photo));

    await axios.post(`/food/${uid}/photos`, form);
}