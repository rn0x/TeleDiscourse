import { Telegraf, Markup, Scenes, session } from 'telegraf';
import fs from 'fs-extra';
import path from 'path';
import * as dotenv from 'dotenv'
import moment from 'moment-hijri';
import command from './command/index.js';
import WizardScene from './WizardScene/WizardScene.js';
import join_left from './module/join_left.js';
import EventText from './module/EventText.js';
import EventPosts_ from './module/EventPosts_.js';
import CrateFolder from './module/CrateFolder.js';
dotenv.config({ override: true });
moment.locale('en-EN');

async function telegram() {

    try {

        console.log('starting discourse bridge: ', moment().format('LT'));

        await CrateFolder();
        let __dirname = path.resolve();
        let config = fs.readJsonSync(path.join(__dirname, './config.json'));
        let options = { channelMode: true, polling: true };
        let client = new Telegraf(process.env.token_telegram || config?.token_telegram, options);
        let stage = new Scenes.Stage(WizardScene);
        client.use(session())
        client.use(stage.middleware());
        await join_left(client); // إنظمام ومغادرة الأعضاء
        await command(client, Markup); // أوامر البوت
        await EventText(client); // حدث تلقي رسالة جديده
        await EventPosts_(client); // حدث عند إنشاء موصوع جديد على discourse
        client.launch().then(() => console.log('Telegram is ready!'));
        client.catch((error) => {
            console.log(error);
        });

    } catch (error) {

        console.log(error);

    }

}

await telegram().catch(e => console.log(e));