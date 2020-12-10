import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

/**
 * Setting the DB entities schemas
 */
@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: Date })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: Date, onUpdate: () => new Date() })
  updatedAt = new Date();

  /**
   * Create UNIQUE user
   */
  @Field()
  @Property({ type: "text", unique: true })
  username!: string;

  /**
   * No @Field, bc it can not be queried, because GraphQL fields are going to be returned from GraphQL!
   */
  @Property({ type: "text" })
  password!: string;
}
