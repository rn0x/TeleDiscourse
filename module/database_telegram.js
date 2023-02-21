import fs from 'fs-extra';
import path from 'path';
import random from './random.js';
import generateKeyPairSync from './generateKeyPairSync.js';

export default async function database_telegram(id, username, name, type, message_id) {

    let __dirname = path.resolve();
    let create_db_user = fs.existsSync(path.join(__dirname, `./database/${type}/${id}.json`));
    
    if (create_db_user === false) {

        let generateKey = generateKeyPairSync();

        if (type === 'chat') {

            let opj = {
                id: id,
                username: username,
                name: name,
                type: type,
                evenPost: false,
                categories: null,
                message_id: message_id
            }

            fs.writeJsonSync(path.join(__dirname, `./database/${type}/${id}.json`), opj, { spaces: '\t' });
        }

        else if (type === 'from') {

            let opj = {
                id: id,
                username: username,
                name: name,
                type: type,
                evenPost: false,
                categories: null,
                message_id: message_id,
                privateKey: generateKey.privateKey,
                publicKey: generateKey.publicKey,
                access: false
            }

            fs.writeJsonSync(path.join(__dirname, `./database/${type}/${id}.json`), opj, { spaces: '\t' });

        }


    }

    else {

        let db_user = fs.readJsonSync(path.join(__dirname, `./database/${type}/${id}.json`));
        db_user.username = username;
        db_user.name = name;
        if (message_id) {
            db_user.message_id = message_id;
        }
        fs.writeJsonSync(path.join(__dirname, `./database/${type}/${id}.json`), db_user, { spaces: '\t' });
    }

}