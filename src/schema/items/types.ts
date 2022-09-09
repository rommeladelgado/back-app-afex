
import { GraphQLString,GraphQLList, GraphQLInt, GraphQLObjectType, GraphQLFloat, GraphQLID, GraphQLInputObjectType } from 'graphql';


 const ItemType = new GraphQLObjectType({
    name: 'Item',
    description: 'Item Type Definition',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        date: { type: GraphQLString },
        mount:  { type: GraphQLFloat },
        country: { type: GraphQLString },
        type: { type: GraphQLString },
        state: { type: GraphQLString },
        image: { type: GraphQLString },
    })
});


const PaginationType = new GraphQLObjectType({
    name: 'pagination',
    description: 'Item Type Definition',
    fields: () => ({
        
        totalResult: { type: GraphQLInt },
        totalPage: { type: GraphQLInt },
        currentPage: { type: GraphQLInt },
        order: { type: GraphQLString },
        rowsPerPage: { type: GraphQLInt },
        items:{ type: GraphQLList(ItemType) }

    })
});

;
const FieldType = new GraphQLInputObjectType({
    name: 'FieldType',
    description: 'Field Type Definition',
    
    fields: () => ({
        field: { type: GraphQLString },
        operation: { type: GraphQLString },
        value: { type: GraphQLString },

    })
});





export {FieldType, ItemType, PaginationType};