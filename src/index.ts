import express from 'express';
import cors from 'cors';

import {Participants} from "./types";
import {fileLoader} from "./fileHandler";
import join from "./join";
import status from "./status";
import getParticipants from "./getParticipants";
import sendMessage from "./sendMessage";
import getMessages from "./getMessages";
import consoleMessages from "./consoleMessages";
import inactiveTimeout from "./inactiveTimeout";

const PORT: number = (process.env.PORT as unknown) as number || 4000;

const app = express();
app.use(cors());
app.use(express.json());

const data = fileLoader();
let participants: Participants = [];

app.post("/participants", (req, res) => join(req, res, data, participants));

app.post("/status", (req, res) => status(req, res, participants));

app.post("/messages", (req, res) => sendMessage(req, res, data, participants));

app.get("/participants", (req, res) => getParticipants(req, res, participants));

app.get("/messages", (req, res) => getMessages(req, res, data, participants))

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    const consoleMessageId = setInterval(() => consoleMessages(participants), 5000);
    const inactiveTimeoutId = setInterval(() => inactiveTimeout(data, participants), 15000);
});