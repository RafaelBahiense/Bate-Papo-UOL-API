import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br');

export interface Data {
    messages: (JoinMessage)[];
}

export type Participants = User[]

export interface User {
    name: string;
    lastOnline: number;
}

export interface Message {
    from: string;
    to: string;
    text: string;
    type: string;
    time: string;
}

abstract class BaseMessage {
    time;
        
    constructor() {
        this.time = dayjs().format("HH:mm:ss");
    }
}

abstract class StatusMessage extends BaseMessage{
    to; type;
        
    constructor() {
        super();
        this.to = 'Todos';
        this.type = 'status';
    }
}

export class JoinMessage extends StatusMessage implements Message {
    from; text;
    
    constructor(from: string) {
        super();
        this.from = from;
        this.text = 'entra na sala...';
    }
}

export class LeftMessage extends StatusMessage implements Message {
    from; text;
    
    constructor(from: string) {
        super();
        this.from = from;
        this.text = 'sai da sala...';
    }
}

export class UserMessage extends BaseMessage {
    from; to; type; text;
        
    constructor(from: string, to: string, type: string, text: string) {
        super();
        this.from = from;
        this.to = to;
        this.type = type;
        this.text = text;
    }
}