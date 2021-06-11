import express from 'express';
import cors from 'cors';
import readline from 'readline';

import {fileLoader, fileWrite} from "./fileHandler";
import {Participants, User, JoinMessage, LeftMessage, UserMessage} from "./types";

const PORT: number = (process.env.PORT as unknown) as number || 4000;

const app = express();
app.use(cors());
app.use(express.json());

const data = fileLoader();
let participants: Participants = [];

app.post("/participants", (req, res) => {
    const user: User = req.body;
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
})

app.post("/status", (req, res) => {
    const isOnline = participants.findIndex((participant) => req.header('User') === participant.name);
    if (isOnline >= 0) {
        participants[isOnline].lastOnline = Date.now();
        res.status(200).send("Login refreshed");
    } else {
        res.status(401).send("User is not online");
    }
})

app.get("/participants", (req, res) => {
    const isOnline = participants.findIndex((participant) => req.header('User') === participant.name);
    if (isOnline >= 0) {
        res.status(200).send(participants);
    } else {
        res.status(401).send("User is not online");
    }
})

app.post("/messages", (req, res) => {
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
})

app.get("/messages", (req, res) => {
    const from = req.header('User');
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
        res.status(200).send(messages);
    } else {
        res.status(401).send("User is not online");
    }
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);

  const onlineMessage = setInterval(() => {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    const participantsCout = `  Online: ${JSON.stringify(participants)}\r`
    process.stdout.write(participantsCout); 
  }, 5000);

  const loginWatcher = setInterval(() => {
    const currentTime: number = Date.now()
    participants = participants.filter((participant) => {
        const timeout: boolean = participant.lastOnline > currentTime - 10000;
        if(timeout) {
            return true;
        } else {
            data.messages.push(new LeftMessage(participant.name));
            fileWrite(data);
            return false;
        }
    });
  }, 15000);
});