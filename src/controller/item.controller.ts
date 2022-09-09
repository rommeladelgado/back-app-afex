import { Data } from "../data/Items";
import { ArgumentsItemModel, Field } from "../types/items/arguments";
import { ItemModel } from "../types/items/item";
import { PaginationModel } from "../types/items/pagination";

export class ItemController {

    constructor(){
    }

    getAll(args: ArgumentsItemModel):PaginationModel {
       
        const items =  Data.getItems();
        const listItems = this.getItemsWithFilter(args,  items);

        const abs = args.order === 'ASC' ? -1:1;

        listItems.sort((a,b) => {
            const date1 = new Date(a.date);
            const date2 = new Date(b.date);

            if (date1.getFullYear() !== date2.getFullYear()) {

                return abs * (date1.getFullYear() > date2.getFullYear() ? -1:1);
            }

            if (date1.getMonth() !== date2.getMonth()) {

                return abs * (date1.getMonth() > date2.getMonth() ? -1:1);
            }

            if (date1.getDate() !== date2.getDate()) {

                return abs * (date1.getDate() > date2.getDate() ? -1:1);
            }
            return 0;
        });

        const initPosition:number = (args.currentPage - 1) * args.rowsPerPage;
        const endpPosition:number = (args.currentPage) * args.rowsPerPage;
        const itemsPerPage = listItems.slice(initPosition, endpPosition);

        const pagination: PaginationModel = {
            currentPage: args.currentPage,
            items: itemsPerPage,
            order: args.order,
            rowsPerPage: args.rowsPerPage,
            totalPage: itemsPerPage.length,
            totalResult: listItems.length
        };

        return pagination;
    }

    getItemsWithFilter(args: ArgumentsItemModel, listItems: ItemModel[]):ItemModel[] {
        const { filterName, filterOthers }: { filterName: ItemModel[], filterOthers: ItemModel[] } = args.filters.reduce((prev:{ filterName: ItemModel[], filterOthers: ItemModel[] }, filter: Field) => {

            if (filter.field === 'name') {
                const filterName: ItemModel[] = prev.filterName
                .filter((item: ItemModel) => item.name.toLowerCase().includes(filter.value.toLocaleLowerCase()));

                prev = {...prev, filterName: [...filterName]};
            }

            if (filter.field !== 'name') {
                const filterOthers: ItemModel[] = prev.filterOthers
                .filter((item: ItemModel) => {
                    const field = JSON.parse(JSON.stringify(item))[filter.field];
                
                    return field === filter.value;
                });
                
                prev = {...prev, filterOthers: [...filterOthers]};
            }
            return prev;
        }, { filterName: [...listItems], filterOthers: [...listItems] });


        if (filterName.length > 0  || filterOthers.length > 0) {
            const ids = filterName.map((item: ItemModel)=> item.id);
            return filterOthers.filter((item: ItemModel) => ids.indexOf(item.id) !== -1);
        }

        if (filterName.length === 0) {
            return filterOthers;
        }

        if (filterOthers.length === 0) {
            return filterName;
        }

        

        return [];
    }
}