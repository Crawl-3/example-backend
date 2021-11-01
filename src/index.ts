import "./services/env";
import { Logger } from "./services/logger";
import { init as initServer } from "./server";
import { init as initDatabase } from "./database/database";

async function setup(): Promise<void> {
    Logger.info("Server starting...");
    await initServer();

    Logger.info("Database starting...");
    await initDatabase();
}

setup();
