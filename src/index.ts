import express from 'express';
import cors from 'cors';
import readline from 'readline';

import {fileLoader, fileWrite} from "./FileHandler";

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
        res.status(209);
        res.send("User already online!");
    } else {
        user.lastOnline = Date.now()
        participants.push(user);
        res.status(201);
        res.send("Login successful");
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
    participants = participants.filter((participant) => participant.lastOnline > currentTime - 10000);
  }, 15000);
});