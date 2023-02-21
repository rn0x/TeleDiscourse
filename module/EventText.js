import fs from 'fs-extra';
import path from 'path';
import database_telegram from '../module/database_telegram.js';
import sendComment from '../discourse/sendComment.js';
import Translation from '../module/translation.js';

export default async function EventText(client) {

    client.on('text', async (ctx) => {

        let __dirname = path.resolve();
        let id_from = ctx?.from?.id;
        let id_chat = ctx?.chat?.id;
        let username_from = ctx?.from?.username;
        let username_chat = ctx?.chat?.username;
        let name_from = ctx?.from?.first_name ? ctx?.from?.first_name : ctx?.from?.last_name ? ctx?.from?.last_name : undefined;
        let name_chat = ctx?.chat?.first_name ? ctx?.chat?.first_name : ctx?.chat?.last_name ? ctx?.chat?.last_name : ctx?.chat?.title;
        let type = ctx?.chat?.type;
        let message_id = ctx?.message?.message_id;
        let me = ctx?.botInfo
        let body = ctx?.message.text;
        let config = fs.readJsonSync(path.join(__dirname, './config.json'));
        let translation = await Translation(`${process.env.language || config?.language}`);

        await database_telegram(id_from, username_from, name_from, 'from'); // from || user
        await database_telegram(id_chat, username_chat, name_chat, 'chat', message_id); // chat || supergroup or group

        if (ctx?.message?.reply_to_message?.from?.id === me?.id) {

            let caption = ctx?.message?.reply_to_message?.caption
            let text = ctx?.message?.reply_to_message?.text
            let fromJson = fs.readJsonSync(path.join(__dirname, `./database/from/${id_from}.json`));

            if (fromJson?.access) {

                if (caption?.split(`${translation.number_topic}: `)[1]) {

                    let topic_id = caption?.split(`${translation.number_topic}: `)[1];
                    let seCo = await sendComment(fromJson?.api_key, topic_id, body);
                    if (seCo?.errors) {
                        for (let item of seCo?.errors) {
                            ctx?.reply(item);
                        }
                    }
                    else {

                        let topic_slug = seCo?.topic_slug
                        let post_number = seCo?.post_number
                        let message = `<b>${translation.comment_posted} ✅ <a href='${process.env.url || config?.url}/t/${topic_slug}/${topic_id}'>${post_number}</a></b>`
                        await ctx?.reply(message, { parse_mode: 'HTML', disable_web_page_preview: true });

                    }
                }

                else if (text?.split(`${translation.number_topic}: `)[1]) {

                    let topic_id = text?.split(`${translation.number_topic}: `)[1];
                    let seCo = await sendComment(fromJson?.api_key, topic_id, body);
                    if (seCo?.errors) {
                        for (let item of seCo?.errors) {
                            ctx?.reply(item);
                        }
                    }
                    else {

                        let topic_slug = seCo?.topic_slug
                        let post_number = seCo?.post_number
                        let message = `<b>${translation.comment_posted} ✅ <a href='${process.env.url || config?.url}/t/${topic_slug}/${topic_id}'>${post_number}</a></b>`
                        await ctx?.reply(message, { parse_mode: 'HTML', disable_web_page_preview: true });

                    }

                }
            }

            else {

                let message = `${translation.first_link_your_account} /discourse ❌`
                ctx?.reply(message);
            }
        }

        else {

            let caption = ctx?.message?.reply_to_message?.caption;
            let text = ctx?.message?.reply_to_message?.text;

            if (caption || text) {

                let cb = caption ? caption : text;

                if (cb.includes(config?.url)) {

                    let fromJson = fs.readJsonSync(path.join(__dirname, `./database/from/${id_from}.json`));

                    if (fromJson?.access) {

                        let topic_id = cb?.split('')[cb?.split('').length - 1] === '/' ? Number(cb.split('/').slice(-2)[0]) : Number(cb.split('/').slice(-1)[0]);
                        let seCo = await sendComment(fromJson?.api_key, topic_id, body);

                        if (seCo?.errors) {
                            for (let item of seCo?.errors) {
                                ctx?.reply(item);
                            }
                        }
                        else {

                            let topic_slug = seCo?.topic_slug
                            let post_number = seCo?.post_number
                            let message = `<b>${translation.comment_posted} ✅ <a href='${process.env.url || config?.url}/t/${topic_slug}/${topic_id}'>${post_number}</a></b>`
                            await ctx?.reply(message, { parse_mode: 'HTML', disable_web_page_preview: true });

                        }
                    }
                }

            }
        }

        console.log(`#Telegram sender: ${username_from ? username_from : id_from} ${type}: ${username_chat ? username_chat : name_chat}`);
    });
}