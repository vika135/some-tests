export function HttpServer<T>(): {get: (endpoint: string) => Promise<T>} {
    const get = async (endpoint: string): Promise<T> => {
        const response = await fetch("http://localhost:3001/" + endpoint)
        return await response.json() as T
    }

    const post = async (endpoint: string, data: T): Promise<T> => {
        const response = await fetch("http://localhost:3001/" + endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        return await response.json() as T
    }

    return { get }
}