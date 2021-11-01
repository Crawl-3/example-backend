import { createConnection } from "typeorm";
import { Logger } from "../services/logger";
import { connectionOptions } from "./connectionOptions";
import { Post } from "./entities/PostEntity";

export async function init(): Promise<void> {
    await createConnection(connectionOptions).then(async (connection) => {
        Logger.info("Connection to database established");
        await connection.manager.save(
            connection.manager.create(Post, {
                author: "Witecuse",
                title: "Is Windows 11 better than Windows 10?",
                content: "Yes, no, yes,  Yes, no , Yes, no, Yes, no, Yes, no, Yes, no",
                details: {
                    createdAt: new Date(),
                },
            })
        );
    });
}
