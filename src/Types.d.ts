interface Data {
    messages: message[];
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

type Participants = User[]

interface User {
    name: string;
    lastOnline: number;
}