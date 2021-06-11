import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br');

export interface Data {
    messages: (JoinMessage)[];
}

interface message {
    message: {
        from: string;
        to: string;
        text: string;
        type: string;
        time: string;
    }
}

export type Participants = User[]

export interface User {
    name: string;
    lastOnline: number;
}

interface Message {
    from: string;
    to: string;
    text: string;
    type: string;
    time: string;
}

export class JoinMessage implements Message {
        from; to; text; type; time;
        
        constructor(from: string) {
            this.from = from;
            this.to = 'Todos';
            this.text = 'entra na sala...';
            this.type = 'status';
            this.time = dayjs().format("HH:mm:ss");
        }
}

export class LeftMessage implements Message {
    from; to; text; type; time;
    
    constructor(from: string) {
        this.from = from;
        this.to = 'Todos';
        this.text = 'sai da sala...';
        this.type = 'status';
        this.time = dayjs().format("HH:mm:ss");
    }
}