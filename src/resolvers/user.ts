import { User } from "../entities/User";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";

/**
 * Can be treated as @Arg-ument for GraphQL queries
 */
@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

/**
 * Handling errors with custon field error type
 */
@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

/**
 * Can be treated as a return type for GraphQL queries.
 * either union or make both optional
 */
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]; // ? => optional

  @Field(() => User, { nullable: true })
  user?: User;
}

/**
 * the resolvers that find things in the DB and return it?
 */
@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse) // return of the GraphQL mutation query!
  // @Arg => GraphQL Argument!!
  // @Ctx => Context with Entity manager!
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length < 2) {
      return {
        errors: [
          {
            field: "username",
            message: "username has to be at least 2 long!",
          },
        ],
      };
    }
    if (options.password.length < 2) {
      return {
        errors: [
          {
            field: "password",
            message: "password is too short! at least 2!",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.message.includes("user_username_unique")) {
        return {
          errors: [
            {
              field: "username",
              message: "username has already been taken",
            },
          ],
        };
      }
      console.log("message: ", err.message);
    }
    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user)
      return {
        errors: [
          {
            field: "username",
            message: "that username doesn't exist!",
          },
        ],
      };
    const valid = await argon2.verify(user.password, options.password);

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }
    return {
      user,
    };
  }
}
