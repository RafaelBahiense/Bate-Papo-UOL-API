import fs from 'fs';

import {Data} from "./types";

const defaultData: Data = {
    messages: []
};

export function fileLoader(): Data {
    if (fs.existsSync("./data/data.json")) {
        return {...JSON.parse(fs.readFileSync('./data/data.json',{encoding:'utf8', flag:'r'}))}
    } else {
        fs.writeFileSync( './data/data.json', JSON.stringify(defaultData), { encoding: "utf8",flag: "w"});
        return defaultData;
    }
}

export function fileWrite(data: Data): void {
    fs.writeFileSync( './data/data.json', JSON.stringify(data), { encoding: "utf8",flag: "w"})
}