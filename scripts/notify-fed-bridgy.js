const child_process = require('child_process')

// webmention送りすぎないよう、最大値を設定
const MAX_MENTION_SENDS = 10

// index.xmlのdiffから、更新のあったURLを推測
const diff = child_process.spawnSync('git', ['diff', '-U0', 'HEAD^', 'index.xml']).stdout.toString()
const links = [...diff.matchAll(/<link>([^<]+)<\/link>/g)].map(match => match[1])
const uniqueLinks = [...new Set(links)]
for (let i = 0; i < uniqueLinks.length && i < MAX_MENTION_SENDS; ++i) {
  const link = uniqueLinks[i]
  console.log(`Sending a webmention from ${link} ...`)
  child_process.spawnSync('curl', ['https://fed.brid.gy/webmention', '-d', `source=${encodeURIComponent(link)}`, '-d', `target=https://fed.brid.gy`])
}
