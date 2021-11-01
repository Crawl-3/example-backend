import express, { json, Request, Response, urlencoded } from "express";
import cors from "cors";
import { Logger } from "./services/logger";
import { getMongoRepository } from "typeorm";
import { Post } from "./database/entities/PostEntity";

const SERVER_PORT = process.env.SERVER_PORT ?? "5000";
const server = express();

server.use(cors({ origin: "https://witecuse.tk", methods: ["GET", "POST"] }));
server.use(json());
server.use(urlencoded({ extended: true }));

server.get("/", (_, res: Response) => res.redirect("https://witecuse.tk"));
server.get("/api", (_, res: Response) =>
    res.status(200).json({
        message: "how did you find me????? </> wanna work with my team? :)",
        statusCode: 200,
    })
);
server.get("/api/v1", (_, res: Response) =>
    res.status(200).json({ im: "not", robot: true, statusCode: 200 })
);
server.get("/api/v1/posts", async (_, res: Response) => {
    const posts = await getMongoRepository(Post).find({});
    res.json(posts);
});

server.post("/api/v1/posts/create", async (req: Request, res: Response) => {
    const { author, title, content } = req.query;

    if (!author) {
        res.status(400).json({ error: "Author is not provided", statusCode: 400 });
        return;
    }
    if (!title) {
        res.status(400).json({ error: "Title is not provided", statusCode: 400 });
        return;
    }
    if (!content) {
        res.status(400).json({ error: "Content is not provided", statusCode: 400 });
        return;
    }

    const manager = getMongoRepository(Post).manager;
    const newPost = manager.create(Post, {
        author: author?.toString(),
        title: title?.toString(),
        content: content?.toString(),
        details: {
            createdAt: new Date(),
        },
    });

    const post = await manager.save(newPost);
    res.json(post);
});

export function init(): void {
    server.listen(SERVER_PORT, () => {
        Logger.info(`Server listening on port ${SERVER_PORT}`);
    });
}
