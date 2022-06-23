import "reflect-metadata";

import path from "path";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";

import { UserResolver } from "./src/resolvers/UserResolver";

async function main() {
  const schema = await buildSchema({
    // Resolvers are like routes on simple rest api.
    resolvers: [UserResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen();

  console.log(`Server runing on ${url}`);
}

main();
