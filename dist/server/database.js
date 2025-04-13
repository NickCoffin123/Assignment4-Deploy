"use strict";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const USER_NAME = process.env.MONGO_USER;
const PASSWORD = process.env.MONGO_PASSWORD;
const DB_NAME = process.env.MONGO_DB;
const CLUSTER = process.env.MONGO_CLUSTER;
const MONG_URI = `mongodb+srv://${USER_NAME}:${PASSWORD}@${CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
class Database {
    constructor() {
        this.db = null;
        this.client = new MongoClient(MONG_URI);
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    async connect() {
        if (!this.db) {
            try {
                await this.client.connect();
                this.db = this.client.db(DB_NAME);
                console.log("Connected to database");
            }
            catch (error) {
                console.log("Could not connect to database: ", error);
                throw error;
            }
        }
        return this.db;
    }
    async disconnect() {
        await this.client.close();
        console.log("Disconnected from database");
        this.db = null;
    }
}
export default Database;
//# sourceMappingURL=database.js.map