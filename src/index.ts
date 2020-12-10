import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import { __port__, __public_url__ } from "./config";
import microConfig from "./mikro-orm.config";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";

/**
 * Main entry
 */
const main = async () => {
  // init the ORM
  const orm = await MikroORM.init(microConfig);

  // starting the migration
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  apolloServer.applyMiddleware({ app });

  app.get("/", (_, res) => {
    res.send("hello");
  });

  app.listen(__port__, () =>
    console.log(
      `started server on ${__public_url__}:${__port__}\ngraphql playground on ${__public_url__}:${__port__}/graphql`
    )
  );
};

main().catch(console.error);
