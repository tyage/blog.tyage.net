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

## 旧記事 URL のリダイレクト

WordPress 時代のクエリ形式 URL は、`netlify/edge-functions/legacy-post-redirects.ts` で
現在の canonical URL へ `301` リダイレクトする。`p` 以外のパラメータがある場合は、
`p` だけを削除して残りを転送先へ引き継ぐ。

```text
/?p=1020 -> /archive/p1020.html
```

存在しない記事 ID は転送しない。

Netlify が配信していた拡張子なし URL は、`static/_redirects` の静的ルールで
canonical URL へ `301` リダイレクトする。通常の記事アクセスでは Edge Function を実行しない。

```text
/archive/p1020 -> /archive/p1020.html
```
