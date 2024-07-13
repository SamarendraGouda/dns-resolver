import axios from 'axios'
import { transformKey } from './utils.js'
import { configDotenv } from 'dotenv'

configDotenv()

async function getSelectors(domain) {
    let selectors = []
    try {
        const params = { domain }
        const res = await axios.get(`${process.env.ARCHIVE_API}/api/key`, { params })
        selectors = res.data.map(ans => ans.selector)
            .sort((a, b) => b.localeCompare(a))

        return selectors
    }
    catch (err) {
        console.error(err)
    }
}

async function getPublicKey(domain, selector) {
    try {
        const params = { name: `${selector}._domainkey.${domain}`, type: 'TXT' }
        const res = await axios.get(`https:/dns.google/resolve`, { params })
        return transformKey(res.data.Answer[0].data)
    }
    catch (err) {
        console.error(err)
    }
}

async function main(){
    const domain = 'gmail.com'
    const selectors = await getSelectors(domain)

    const key = await getPublicKey(domain, selectors[0])
    console.log(key)
}

await main()



