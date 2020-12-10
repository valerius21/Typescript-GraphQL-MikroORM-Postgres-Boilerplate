import { Query, Resolver } from "type-graphql";

/**
 * the resolvers that find things in the DB and return it?
 */
@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return "sup bitch";
  }
}
