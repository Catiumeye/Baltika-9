import { PaginationInput } from "../models/input/pagination-input.type";


export const paginationUtil = (pagination: PaginationInput): {take: number, skip: number} => {
    return {
        take: pagination.perPage,
        skip: (pagination.page - 1) * pagination.perPage
    }
}