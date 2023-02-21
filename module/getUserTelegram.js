import fs from 'fs-extra';
import path from 'path';

export default async function getUserTelegram() {

    let __dirname = path.resolve();
    let chat = fs.readdirSync(path.join(__dirname, './database/chat'));
    let from = fs.readdirSync(path.join(__dirname, './database/from'));
    let array = []

    for (let item of chat) {

        let id = item.split('.json')[0]
        let chatJson = fs.readJsonSync(path.join(__dirname, `./database/chat/${item}`));
        if (chatJson?.evenPost) {

            array.push(id);
        }
    }

    for (let item of from) {

        let id = item.split('.json')[0]
        let fromJson = fs.readJsonSync(path.join(__dirname, `./database/from/${item}`));
        if (fromJson?.evenPost) {

            array.push(id);
        }
    }

    return array
}