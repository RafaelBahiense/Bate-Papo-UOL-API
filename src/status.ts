import { Request, Response } from "express";
import { stripHtml } from "string-strip-html";

import {Participants} from "./types";

export default function status(req: Request, res: Response, participants: Participants): void {
    const isOnline = participants.findIndex((participant) => req.header('User') === participant.name);
    if (isOnline >= 0) {
        participants[isOnline].lastOnline = Date.now();
        res.status(200).send("Login refreshed");
    } else {
        res.status(401).send("User is not online");
    }
}