interface ArgumentsItemModel {
    filters: Field[],
    order: 'ASC' | 'DESC', //order id
    currentPage: number,
    rowsPerPage: number,
};

interface Field {
    field: string;
    value: string;
}


export { ArgumentsItemModel , Field }

