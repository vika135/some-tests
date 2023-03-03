import {useState} from "react";
import {HttpServer} from "../../../services/http";

export default function usePostDataToBackend<T>(): [boolean, (data: T) => Promise<T>] {
    const [loading, setIsLoading] = useState<boolean>(false);

    async function postData(data: T): Promise<T> {
        setIsLoading(true);
        const newCard = await HttpServer<T>().post("cards", data)
        setIsLoading(false);
        return newCard;
    }

    return [loading, postData];
}