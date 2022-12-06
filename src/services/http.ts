import {endpoints} from "../api/endpoints";

interface RestServer<T> {
    getAll: (endpoint: string) => Promise<T>,
    get: (endpoint: string, id: number) => Promise<T>,
    post: (endpoint: string, data: T) => Promise<T>,
    remove: (endpoint: string, id: number) => Promise<Record<string,never>>,
}

export function HttpServer<T>(): RestServer<T> {

    const getAll = async (endpoint: string): Promise<T> => {
        const response = await fetch(endpoints.list(endpoint))
        return await response.json() as T
    }

    const get = async (endpoint: string, id: number): Promise<T> => {
        const response = await fetch(endpoints.item(endpoint, id))
        return await response.json() as T
    }

    const post = async (endpoint: string, data: T): Promise<T> => {
        const response = await fetch(endpoints.list(endpoint), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return await response.json() as T
    }

    const remove = async (endpoint: string, id: number): Promise<Record<string,never>> => {
        const response = await fetch(endpoints.item(endpoint, id), {
            method: 'DELETE',
        })
        return await response.json()
    }

    return { getAll, post, remove, get }
}
