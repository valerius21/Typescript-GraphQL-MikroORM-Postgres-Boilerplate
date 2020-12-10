/**
 * Typings for env vars
 */
declare namespace NodeJS {
  interface ProcesEnv {
    NODE_ENV: "development" | "production" | "test";
    PUBLIC_URL: string | "localhost";
    PORT: number | 5000;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    TOKEN_SECRET: string;
    IS_PROD: boolean;
    APP_NAME: string;
    BRAND: string;
  }
}
