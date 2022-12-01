export function HttpServer<T>():
    {
        get: (endpoint: string) => Promise<T>,
        post: (endpoint: string, data: T) => Promise<T>,
        remove: (endpoint: string, id: number) => Promise<Record<string,never>>,
    } {
    const get = async (endpoint: string): Promise<T> => {
        const response = await fetch("http://localhost:3001/" + endpoint)
        return await response.json() as T
    }

    const post = async (endpoint: string, data: T): Promise<T> => {
        const response = await fetch("http://localhost:3001/" + endpoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return await response.json() as T
    }

    const remove = async (endpoint: string, id: number): Promise<Record<string,never>> => {
        const response = await fetch("http://localhost:3001/" + endpoint + "/" + id, {
            method: 'DELETE',
        })
        return await response.json()
    }

    return { get, post, remove }
}
