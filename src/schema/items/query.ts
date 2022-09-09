// import { Data } from "../../data/Items";
// import { ItemType, FieldType } from "./types";
// import {
//     GraphQLNonNull,
//     GraphQLList,
//     GraphQLString,
//     GraphQLInt,

//   } from 'graphql';

  
//  export const GET_USER = {
//     type: GraphQLList(ItemType),
//     args: {
//       order: { type: new GraphQLNonNull(GraphQLString) },
//       currentPage: { type: new GraphQLNonNull(GraphQLInt) },
//       rowsPerPage: { type: new GraphQLNonNull(GraphQLInt) },
//       fields: { type: new GraphQLList(FieldType)}
//     },
//      resolve(_: any, args: any) {
      
//       return Data.getItems(args);
//     },
//   };

 import { FieldType,  PaginationType } from "./types";

import {
    GraphQLInt,
    GraphQLList, GraphQLNonNull, GraphQLString,
  } from 'graphql';
import { ItemController } from "../../controller/item.controller";


export const GET_USER = {
    type: PaginationType,
    args: {
        order: { type: new GraphQLNonNull(GraphQLString) },
        currentPage: { type: new GraphQLNonNull(GraphQLInt) },
        rowsPerPage: { type: new GraphQLNonNull(GraphQLInt),  },
        filters: { type:  GraphQLList(FieldType) },
    },
    resolve(_: any, args: any) {
     const itemController: ItemController = new ItemController();
     return itemController.getAll(args);
    },
  };


