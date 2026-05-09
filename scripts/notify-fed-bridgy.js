const child_process = require('child_process')

// webmention送りすぎないよう、最大値を設定
const MAX_MENTION_SENDS = 10

// 1deployでこの数を超えるURL差分が出た場合は、index.xmlの構造的変化
// (Hugoバージョン更新, --minify切替等) の可能性が高いのでスキップする
const ABORT_THRESHOLD = 5

// index.xmlのdiffから、更新のあったURLを推測
const diff = child_process.spawnSync('git', ['diff', '-U0', 'HEAD^', 'index.xml']).stdout.toString()
const links = [...diff.matchAll(/<link>([^<]+)<\/link>/g)].map(match => match[1])
const uniqueLinks = [...new Set(links)]

if (uniqueLinks.length > ABORT_THRESHOLD) {
  console.warn(`Aborting: ${uniqueLinks.length} unique URLs in diff exceeds threshold ${ABORT_THRESHOLD}. Likely a structural index.xml change.`)
  process.exit(0)
}

for (let i = 0; i < uniqueLinks.length && i < MAX_MENTION_SENDS; ++i) {
  const link = uniqueLinks[i]
  console.log(`Sending a webmention from ${link} ...`)
  child_process.spawnSync('curl', ['https://fed.brid.gy/webmention', '-d', `source=${encodeURIComponent(link)}`, '-d', `target=https://fed.brid.gy`])
}
