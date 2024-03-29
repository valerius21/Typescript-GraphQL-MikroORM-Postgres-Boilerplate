import { Query, Resolver } from "type-graphql";

/**
 * the resolvers that find things in the DB and return it. Endpoint is GraphQL.
 */
@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return "Hello from hello.ts";
  }
}
