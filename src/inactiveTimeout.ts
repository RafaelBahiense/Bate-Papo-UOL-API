import {Data, Participants, LeftMessage} from "./types";
import {fileWrite} from "./fileHandler";

export default function inactiveTimeoutId(data: Data, participants: Participants): void {
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
}