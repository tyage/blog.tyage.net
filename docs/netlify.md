# Netlify 設定

このブログで維持する設定のメモ。

## Netlify

| 設定 | 値 |
| --- | --- |
| Build command | `hugo` |
| Publish directory | `public` |
| Pretty URLs | **無効** |
| Legacy Prerendering | **無効** |

Pretty URLs は、旧記事の `.html` 付き URL を維持するため無効にする。`netlify.toml` で次のように固定している。

```toml
[build.processing.html]
  pretty_urls = false
```

Legacy Prerendering は Hugo には不要。Netlify 管理画面で **Enable legacy prerendering** のチェックを外す。

## Google クロール

`static/robots.txt` は次の状態を維持する。

```text
User-agent: *
Allow: /

Sitemap: https://blog.tyage.net/sitemap.xml
```

## 設定変更後の確認

```sh
curl -I https://blog.tyage.net/robots.txt
curl -I https://blog.tyage.net/sitemap.xml
curl -I https://blog.tyage.net/archive/p918.html
```

すべて HTTP 200 になることと、`.html` 付き URL が別の URL に書き換えられないことを確認する。

Search Console で 5xx が残っている場合は、対象 URL の「公開 URL をテスト」が成功することを確認してから、問題グループの「修正を検証」を開始する。全 URL を一件ずつ再送信する必要はない。
