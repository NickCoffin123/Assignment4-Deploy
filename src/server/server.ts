"use strict"

import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import contactRoutes from "./contactRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

async function startServer() {
    try {
        app.listen(port, () => {
            console.log(`Server started on port: ${port}`)
        })
    } catch (error) {
        console.error("The server could not be started");
    }
}

app.use(express.json());

app.use(express.static(path.join(__dirname, '../..')));

app.use("/node_modules/@fortawesome/fontawesome-free",
    express.static(path.join(__dirname, '../../node_modules/@fortawesome/fontawesome-free')));

app.use("/node_modules/bootstrap",
    express.static(path.join(__dirname, '../../node_modules/bootstrap')));

app.use('/site-data', express.static(path.join(__dirname, '../../public/site-data')));

app.use('/api/users', contactRoutes);

const users = [
    {
        "displayName": "NickCoffin",
        "emailAddress": "nick@coffin.com",
        "username": "ncoffin",
        "password": "abc123"
    },
    {
        "displayName": "Brady Inglis",
        "emailAddress": "brady@inglis.com",
        "username": "binglis",
        "password": "123abc"
    },
    {
        "displayName": "admin",
        "emailAddress": "user@admin.com",
        "username": "admin",
        "password": "password"
    }
];

app.get("/", (request: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../..', 'index.html'));
});

app.get("/users", (request: Request, res: Response) => {
    res.send({users})
});

await startServer();