import { Request, Response } from "express";
import { stripHtml } from "string-strip-html";
import Joi from "joi";


import {Participants} from "./types";

const schema = Joi.string()
    .alphanum()
    .min(3)
    .max(15)
    .required()
    .trim();

export default function status(req: Request, res: Response, participants: Participants): void {
    const userName = stripHtml(req.header('User') || "").result;
    const isValidData = schema.validate(userName)
    if (isValidData.error) {
        res.status(400).send(isValidData.error.details.map((err) => err.message).toString().replace(",","\n"));
    } else {
        const isOnline = participants.findIndex((participant) => userName === participant.name);
        if (isOnline >= 0) {
            participants[isOnline].lastOnline = Date.now();
            res.status(200).send("Login refreshed");
        } else {
            res.status(401).send("User is not online");
        }
    }
}