import { Request, Response } from "express";
import { stripHtml } from "string-strip-html";
import Joi from "joi";

import {Data, Participants, UserMessage, Message} from "./types";
import {fileWrite} from "./fileHandler";

const schemaMessage = Joi.object({
    to: Joi.string()
    .alphanum()
    .min(3)
    .max(15)
    .required()
    .trim(),

    text: Joi.string()
    .min(1)
    .required()
    .trim(),

    type: Joi.string()
    .alphanum()
    .min(3)
    .max(15)
    .required()
    .trim(),
})

const schemaUserHeader = Joi.string()
    .alphanum()
    .min(3)
    .max(15)
    .required()
    .trim();

export default function sendMessage(req: Request, res: Response, data: Data, participants: Participants) {
    const from: string = stripHtml(req.header('User') || "").result;

    const isValidUserHeader = schemaUserHeader.validate(from);
    if (isValidUserHeader.error) {
        res.status(400).send(isValidUserHeader.error.details.map((err) => err.message).toString().replace(",","\n"));
    } else {
        const message: Message = req.body;
        message.to = stripHtml(message.to).result;
        message.text = stripHtml(message.text).result;
        message.type = stripHtml(message.type).result;

        const isValidMessage = schemaMessage.validate(message)
        if (isValidMessage.error) {
            res.status(400).send(isValidMessage.error.details.map((err) => err.message).toString().replace(",","\n"));
        } else {
            const isOnline = participants.findIndex((participant) => from === participant.name);
            if (isOnline >= 0) {
                const userMessage = new UserMessage(from, message.to, message.type, message.text);
                data.messages.push(userMessage);
                fileWrite(data);
                res.status(200).send("ok");
            } else {
                res.status(401).send("User is not online");
            }
        }
    }
}