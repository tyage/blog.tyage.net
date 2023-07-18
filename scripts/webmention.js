const Webmention = require('@remy/webmention')

// XXX: Currently read only one page. We may need more?
const BRIDGY_FED_URL = 'https://fed.brid.gy/web/blog.tyage.net'
const MY_URL = 'https://blog.tyage.net/'

const wm = new Webmention({ limit: 10, send: true })
wm.on('error', e => console.log(e))
wm.on('sent', res => {
    console.log('source   = ' + res.source)
    console.log(`endpoint = ${res.endpoint.url} (${res.endpoint.type})`)
    console.log('target   = ' + res.target)
    console.log(`status   = ${res.status} ${res.status < 400 ? '✓' : '✗'}`) // ✖︎✓✔︎✗
    if (res.error) console.log('error    = ' + res.error)
    console.log('')
});
  
const main = async () => {
    const html = await (await fetch(BRIDGY_FED_URL)).text()
    const matches = html.matchAll(/href="\/log([^"]+)/g)
    const activityURLs = [...matches].map(match => match && match[0]).map(href => href.split('&key=')[1])
    for (let url of activityURLs) {
        // Prevent self webmention
        if (decodeURIComponent(url).startsWith(MY_URL)) {
            continue
        }

        // URL => https://ap.brid.gy/convert/web/URL
        let bridgyApURL = `https://ap.brid.gy/convert/web/${url}`

        // %23(#) in URL should be ^^ in Bridgy Fed
        bridgyApURL = bridgyApURL.replace(encodeURIComponent('#'), encodeURIComponent('^^'))

        try {
            wm.fetch(bridgyApURL)
        } catch(e) {
            // bridgyApURL might be error
            console.error(e)
        }
    }
}
main()
