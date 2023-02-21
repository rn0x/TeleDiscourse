export default function buildUrl(site, publicKey) {
    if (!site.startsWith('https://')) {
        throw new Error('The site URL should start with "https://"')
    } else if (site.endsWith('/')) {
        throw new Error('The site URL name should have no trailing slash')
    }

    else {
        const url = new URL(`${site}/user-api-key/new`)

        url.searchParams.append('application_name', 'Bot TeleDiscourse V1.0')
        url.searchParams.append('client_id', 'Aosus')
        url.searchParams.append('scopes', ["write", "read"])
        url.searchParams.append('public_key', publicKey)
        url.searchParams.append('nonce', '1')
        return url.href
    }
}