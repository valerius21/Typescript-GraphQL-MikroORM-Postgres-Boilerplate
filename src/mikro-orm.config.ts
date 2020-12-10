import { MikroORM } from "@mikro-orm/core";
import path from "path";
import {
  __db_name__,
  __db_password__,
  __db_user__,
  __is_prod__,
} from "./config";
import { User } from "./entities/User";

/**
 * MirkroORM config
 */
export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [User], // adding entities
  dbName: __db_name__,
  user: __db_user__,
  password: __db_password__,
  debug: !__is_prod__,
  type: "postgresql",
} as Parameters<typeof MikroORM.init>[0];
