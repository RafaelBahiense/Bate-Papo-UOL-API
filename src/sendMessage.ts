import { Request, Response } from "express";
import { stripHtml } from "string-strip-html";

import {Data, Participants, UserMessage} from "./types";
import {fileWrite} from "./fileHandler";


export default function sendMessage(req: Request, res: Response, data: Data, participants: Participants) {
    const from = req.header('User');
    const isOnline = participants.findIndex((participant) => from === participant.name);
    if (isOnline >= 0) {
        const userMessage = new UserMessage(from, req.body.to, req.body.type, req.body.text);
        data.messages.push(userMessage);
        fileWrite(data);
        res.status(200).send("ok");
    } else {
        res.status(401).send("User is not online");
    }
}