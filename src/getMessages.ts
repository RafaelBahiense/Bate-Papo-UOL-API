import { Request, Response } from "express";

import {Data, Participants} from "./types";

export default function getMessages(req: Request, res: Response, data: Data, participants: Participants): void {
    const from = req.header('User');
    const limit = (req.query.limit as unknown) as number;
    const isOnline = participants.findIndex((participant) => from === participant.name);
    if (isOnline >= 0) {
        const messages = data.messages.filter((message) => {
                                                            if("Todos" === message.to){
                                                                return true;
                                                            } else if (from === message.from) {
                                                                return true;
                                                            } else if (from === message.to) {
                                                                return true;
                                                            } else {
                                                                return false;
                                                            }
                                                        })
        if(limit){
            res.status(200).send(messages.slice(limit * (-1)));
        } else {
            res.status(200).send(messages);
        }
    } else {
        res.status(401).send("User is not online");
    }
}