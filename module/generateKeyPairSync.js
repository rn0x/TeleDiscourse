import { generateKeyPairSync } from 'crypto'

export default () => {
    
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
    });

    return {
        publicKey: publicKey,
        privateKey: privateKey
    }
}