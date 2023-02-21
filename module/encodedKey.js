import { privateDecrypt, constants } from 'crypto'

export default async function encodedKey(api_key, privateKey) {
    try {
        const trim = api_key?.trim()?.replace(/\s/g, '')
        const decreptedKey = privateDecrypt(
            {
                key: privateKey,
                padding: constants.RSA_PKCS1_PADDING,
            },
            Buffer.from(trim, 'base64')
        )
        const json = decreptedKey?.toString('ascii')
        //console.info(`Done. The API key is ${JSON.parse(json).key}`)
        
        return JSON?.parse(json)?.key


    } catch (error) {
        //console.log('Please input the encoded key displayed in the Discourse');
        return false
    }
}