import { ConnectionOptions } from "typeorm";

export const connectionOptions: ConnectionOptions = {
    type: "mongodb",
    url: "mongodb+srv://witecuse:witecuse@cluster0.bo5c0.mongodb.net/example-backend?retryWrites=true&w=majority",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: false,
    entities: ["src/database/entities/**/*.ts"],
    migrations: ["src/database/migrations/**/*.ts"],
    subscribers: ["src/database/subscribers/**/*.ts"],
    cli: {
        entitiesDir: __dirname + "/entities",
        migrationsDir: __dirname + "/migrations",
        subscribersDir: __dirname + "/subscribers",
    },
};
