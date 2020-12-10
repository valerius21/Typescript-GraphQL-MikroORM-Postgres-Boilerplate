/**
 * Config for APP
 */
export const __public_url__ = process.env.PUBLIC_URL || "http://localhost";
export const __port__ = process.env.PORT ? +process.env.PORT : 5000;
export const __db_name__ = process.env.DB_NAME || "tpmg";
export const __db_user__ = process.env.DB_USER || "postgres";
export const __db_password__ = process.env.DB_PASSWORD || "postgres";
export const __db_host__ = process.env.DB_HOST || "localhost";
export const __token_secret__ = process.env.TOKEN_SECRET || "secret";
export const __is_prod__ = process.env.IS_PROD === "production";
export const __app_name__ = process.env.APP_NAME || "tmpg";
export const __brand__ = process.env.BRAND || "tmpg";
