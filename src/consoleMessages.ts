import readline from 'readline';

import {Participants} from "./types";

export default function consoleMessages(participants: Participants): void {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    const participantsCout = `  Online: ${participants.map((participant) => participant.name).toString()}\r`;
    process.stdout.write(participantsCout); 
}