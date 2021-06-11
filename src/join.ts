import { Request, Response } from "express";
import { stripHtml } from "string-strip-html";
import Joi from "joi";

import {Data, Participants, User, JoinMessage} from "./types";
import {fileWrite} from "./fileHandler";

const schema = Joi.object({
    name: Joi.string()
    .alphanum()
    .min(3)
    .max(15)
    .required()
    .trim()
})

export default function join (req: Request, res: Response, data: Data, participants: Participants): void {
    const user: User = req.body;
    user.name = stripHtml(user.name).result;
    const isValidData = schema.validate(user)
    
    if (isValidData.error) {
        res.status(400).send(isValidData.error.details.map((err) => err.message).toString().replace(",","\n"));
    } else {
        const isOnline: boolean = participants.some((participant) => user.name === participant.name);
        if (isOnline) {
            res.status(209).send("User already online!");
        } else {
            const joinMessage = new JoinMessage(user.name);
            user.lastOnline = Date.now()
            participants.push(user);
            data.messages.push(joinMessage);
            fileWrite(data);
            res.status(201).send("Login successful");
        }
    }
}