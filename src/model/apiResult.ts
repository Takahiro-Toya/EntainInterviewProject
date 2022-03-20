

export interface ApiResult<T> {
    success: boolean,
    data?: T | null,
    message: string,
    responseCode: number
}