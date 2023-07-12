const child_process = require('child_process')

// webmention送りすぎないよう、最大値を設定
const MAX_MENTION_SENDS = 10
const diff = child_process.spawnSync('git', ['diff', 'HEAD^']).toString()
const links = diff.matchAll(/<link>([^<]+)<\/link>/g)
for (let i = 0; i < links.length && i < MAX_MENTION_SENDS; ++i) {
  const link = links[i]
  child_process.spawnSync('curl', ['https://fed.brid.gy/webmention', '-d', `source="${encodeURIComponent(link)}"`, '-d', `target="https://fed.brid.gy"`])
}
