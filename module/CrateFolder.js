import fs from 'fs-extra';
import path from 'path';

export default async function CrateFolder() {

    let __dirname = path.resolve();

    fs.existsSync(path.join(__dirname, './database')) ? true :
        fs.mkdirSync(path.join(__dirname, './database'), { recursive: true });

    fs.existsSync(path.join(__dirname, './database/chat')) ? true :
        fs.mkdirSync(path.join(__dirname, './database/chat'), { recursive: true });

    fs.existsSync(path.join(__dirname, './database/from')) ? true :
        fs.mkdirSync(path.join(__dirname, './database/from'), { recursive: true });

    fs.existsSync(path.join(__dirname, './database/EventPosts.json')) ? true :
        fs.writeJsonSync(path.join(__dirname, './database/EventPosts.json'), []);

}