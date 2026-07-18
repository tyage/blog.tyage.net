# Netlify 設定

このブログで維持する設定のメモ。

| 設定 | 値 |
| --- | --- |
| Build command | `hugo` |
| Publish directory | `public` |
| Pretty URLs | **無効** |
| Legacy Prerendering | **無効** |

## Pretty URLs

旧記事の `.html` 付き URL を維持するため無効にする。`netlify.toml` で次のように固定している。

```toml
[build.processing.html]
  pretty_urls = false
```

## Legacy Prerendering

Hugo が HTML を生成するため不要。Netlify 管理画面で **Enable legacy prerendering** のチェックを外す。
