import fetch from 'node-fetch';
import fs from 'fs-extra';
import path from 'path';

export default async function CreatePosts(User_Api_Key, title, raw, category) {

    try {

        let __dirname = path.resolve();
        let config = fs.readJsonSync(path.join(__dirname, './config.json'));
        let body = {

            "title": title,
            "raw": raw,
            "category": category
        }
        let init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Api-Key': User_Api_Key
            },
            body: JSON.stringify(body),
        }
        let response = await fetch(process.env.url || config?.url + '/posts.json ', init);
        let data = await response.json();

        if (data?.action && data?.errors) {

            return {
                action: data?.action,
                errors: data?.errors
            }

        }

        else {

            return {

                id: data?.id,
                username: data?.username,
                created_at: data?.created_at,
                cooked: data?.cooked,
                raw: data?.raw,
                post_number: data?.post_number,
                post_type: data?.post_type,
                reply_count: data?.reply_count,
                reply_to_post_number: data?.reply_to_post_number,
                topic_id: data?.topic_id,
                topic_slug: data?.topic_slug

            }

        }

    } catch (error) {

        console.log(error);

    }

}