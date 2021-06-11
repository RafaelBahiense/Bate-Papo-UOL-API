import { Request, Response } from "express";

import {Participants} from "./types";

export default function getParticipants(req: Request, res: Response, participants: Participants): void {
    const isOnline = participants.findIndex((participant) => req.header('User') === participant.name);
    if (isOnline >= 0) {
        res.status(200).send(participants);
    } else {
        res.status(401).send("User is not online");
    }
}