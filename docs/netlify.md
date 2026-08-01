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

`netlify/edge-functions/legacy-post-redirects.ts` で、WordPress 時代の URL と
Netlify が配信していた拡張子なし URL を現在の canonical URL へ `301` リダイレクトする。

```text
/?p=1020        -> /archive/p1020.html
/archive/p1020 -> /archive/p1020.html
```

存在しない記事 ID は転送しない。クエリ形式の旧 URL に `p` 以外のパラメータがある場合は、
`p` だけを削除して残りを転送先へ引き継ぐ。
