"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import express from "express";
import Database from "./database.js";
const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const db = await Database.getInstance().connect();
        const users = await db.collection("users").find().toArray();
        res.json(users);
    }
    catch (error) {
        console.error("Failed to get all users");
        res.status(500).json({ message: "Something went wrong" });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const db = await Database.getInstance().connect();
        const users = await db.collection("users").findOne({ displayName: req.params.id });
        if (users) {
            res.json(users);
        }
        else {
            res.status(404).json({ message: "Not Found" });
        }
    }
    catch (error) {
        console.error("Failed to get a user");
        res.status(500).json({ message: "Something went wrong" });
    }
});
router.get("/events", async (req, res) => {
    try {
        const db = await Database.getInstance().connect();
        const events = await db.collection("events").find().toArray();
        console.log("✅ Events returned from DB:", events);
        res.json({ events });
    }
    catch (error) {
        console.error("Failed to fetch events", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
router.post('/', async (req, res) => {
    try {
        const db = await Database.getInstance().connect();
        const users = await db.collection("users").find().toArray();
        const newId = users.length > 0 ? (Math.max(...users.map(c => parseInt(c.id))) + 1).toString() : '1';
        const newUser = Object.assign({ id: newId }, req.body);
        await db.collection("users").insertOne(newUser);
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error("Failed to create a user");
        res.status(500).json({ message: "Something went wrong" });
    }
});
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const db = await Database.getInstance().connect();
        const user = await db.collection("users").findOne({ username, password });
        if (user) {
            res.json({
                id: user._id.toString(),
                displayName: user.displayName,
                emailAddress: user.emailAddress,
                username: user.username
            });
        }
        else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    }
    catch (error) {
        console.error("Login error", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const db = await Database.getInstance().connect();
        const updatedData = __rest(req.body, []);
        const result = await db.collection("users").findOneAndUpdate({ id: req.params.id }, { $set: updatedData }, { returnDocument: 'after' });
        if (result && result.value) {
            res.json(result.value);
        }
    }
    catch (error) {
        console.error("Failed to update a user");
        res.status(500).json({ message: "Something went wrong" });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const db = await Database.getInstance().connect();
        const result = await db.collection("users").deleteOne({ id: req.params.id });
        if (result.deletedCount > 0) {
            res.json({ message: "User deleted successfully." });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        console.error("Failed to delete user");
        res.status(500).json({ message: "Something went wrong" });
    }
});
export default router;
//# sourceMappingURL=contactRoutes.js.map