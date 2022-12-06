export const endpoints = {
    list: (endpoint: string) => `${process.env.REACT_APP_REST_API_URL}/${endpoint}`,
    item: (endpoint: string, id: number) => `${process.env.REACT_APP_REST_API_URL}/${endpoint}/${id}`,
}