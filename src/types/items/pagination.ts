import { ItemModel } from "./item";

export interface PaginationModel {
    totalResult: number;
        totalPage: number;
        currentPage: number;
        order: string,
        rowsPerPage: number;
        items: ItemModel[]
}