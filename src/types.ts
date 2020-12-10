import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";

/**
 * Add your own types here.
 */
export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
};
