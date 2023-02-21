import { Scenes } from 'telegraf';
import fs from 'fs-extra';
import path from 'path';
import Translation from '../module/translation.js';
import encodedKey from '../module/encodedKey.js';
import buildUrl from '../module/buildUrl.js';

let __dirname = path.resolve();
let config = fs.readJsonSync(path.join(__dirname, './config.json'));
let translation = await Translation(`${process.env.language || config?.language}`);

export default new Scenes.WizardScene(
    'discourse',
    async (ctx) => {
        let id_from = ctx?.from?.id;
        let fromJson = fs.readJsonSync(path.join(__dirname, `./database/from/${id_from}.json`));

        if (ctx?.chat?.type === 'supergroup' || ctx?.chat?.type === 'group') {

            await ctx?.reply(`${translation.send_me_private_message_to_link_your_account} ⚠️`);
            return ctx.scene.leave();

        }

        else {
            if (fromJson?.access) {
                await ctx?.reply(`${translation.err_linked_to_discourse} ⁉️`);
                return ctx.scene.leave();
            }

            else {
                let url = buildUrl(config?.url, fromJson?.publicKey)
                let message = `${translation.steps_key_code} 📜 :\n\n`
                message += `<b><a href='${url}'>1- ${translation.click_url_key_code}</a></b>\n`
                message += `<b>2- ${translation.access_key_code}</b>\n`
                message += `<b>3- ${translation.copy_key_code} 📝</b>\n`
                await ctx?.reply(message, { parse_mode: 'HTML', disable_web_page_preview: true });
                return ctx.wizard.next();
            }
        }
    },
    async (ctx) => {

        if (ctx.message?.text !== undefined) {
            let id_from = ctx?.from?.id;
            let fromJson = fs.readJsonSync(path.join(__dirname, `./database/from/${id_from}.json`));
            let EncodedKey = await encodedKey(ctx.message?.text, fromJson?.privateKey).catch(e => console.log(e));

            if (EncodedKey) {
                fromJson.api_key = EncodedKey;
                fromJson.access = true;
                fs.writeJsonSync(path.join(__dirname, `./database/from/${id_from}.json`), fromJson, { spaces: '\t' });
                await ctx?.reply(`${translation.active_key_code} ✅\n\nThe API key is : ${EncodedKey}`);
                return ctx.scene.leave();
            }
            else {
                await ctx?.reply(`${translation.err_key_code} ❌`);
                return ctx.scene.leave();
            }
        }

        else {
            ctx?.reply(`${translation.err_wrong_entry} ❌`);
            return ctx.scene.leave();
        }
    }
)