import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_USER } from "./items/query";


const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getItems: GET_USER
  },
});



export const schema = new GraphQLSchema({
  query: RootQuery,
});