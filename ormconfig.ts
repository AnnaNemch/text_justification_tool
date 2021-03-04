// import { User } from "./src/entities";

const {
  APP_POSTGRES_HOST,
  APP_POSTGRES_PORT,
  APP_POSTGRES_USER,
  APP_POSTGRES_PASSWORD,
  APP_POSTGRES_DB,
  SSL_CERT
} = process.env;

module.exports = {
  type: "postgres",
  host: APP_POSTGRES_HOST,
  port: parseInt(APP_POSTGRES_PORT) || 5432,
  username: APP_POSTGRES_USER,
  password: APP_POSTGRES_PASSWORD,
  database: APP_POSTGRES_DB,
  migrations: ["dist/migrations/*.js"],
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "src/entities",
  },
  entities: ["dist/**/*.entity.js"],
  logging: true,
  synchronize: true,
};
