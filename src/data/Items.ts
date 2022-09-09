
import { ItemModel } from '../types/items/item';

import itemsJson from './response.json';



export class Data {

    static getItems(): ItemModel[] {
        return itemsJson;                           
    }
}