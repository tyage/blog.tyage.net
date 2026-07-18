# Netlify・検索インデックス関連の設定

このブログを Netlify で運用するときの設定メモです。旧記事の URL と Googlebot のクロールを壊さないため、設定変更時はこのページを確認してください。

## 前提

- ビルドコマンド: `hugo`
- 公開ディレクトリ: `public`
- 旧記事の正規 URL には `.html` が含まれる（例: `/archive/p918.html`）
- `static/robots.txt` はデプロイ時に `/robots.txt` として公開される
- サイトマップ: `https://blog.tyage.net/sitemap.xml`

## 必須の Netlify 設定

| 設定 | 値 | 理由 |
| --- | --- | --- |
| Pretty URLs | **無効** | `.html` を除去・変換せず、旧記事の正規 URL を維持するため |
| Legacy Prerendering | **無効** | Hugo が完成済み HTML を生成するため不要。非推奨機能を Googlebot 向け配信に挟まない |
| Build command | `hugo` | Hugo サイトを生成する |
| Publish directory | `public` | Hugo の生成物を配信する |

Pretty URLs は `netlify.toml` の次の設定で無効化している。このファイルの値が Netlify 管理画面の設定を上書きする。

```toml
[build.processing.html]
  pretty_urls = false
```

Legacy Prerendering は Netlify 管理画面で確認する。

1. Project configuration を開く
2. Prerendering（または Legacy Prerendering）を開く
3. **Enable legacy prerendering** のチェックを外して保存する

## robots.txt

管理元は `static/robots.txt`。期待する内容は次のとおり。

```text
User-agent: *
Allow: /

Sitemap: https://blog.tyage.net/sitemap.xml
```

Search Console の robots.txt 再クロールが一時的に失敗しても、公開 URL が HTTP 200 で取得できるなら何度も設定を変更しない。まず Netlify の配信状態とデプロイログを確認する。

## デプロイ後の確認

次の URL が HTTP 200 で、リダイレクトループや 5xx にならないことを確認する。

```sh
curl -I https://blog.tyage.net/robots.txt
curl -I https://blog.tyage.net/sitemap.xml
curl -I https://blog.tyage.net/archive/p918.html
```

さらに以下を確認する。

- `/archive/p918.html` が `/archive/p918` に書き換えられていない
- HTML の canonical URL が実際の公開 URL と一致している
- サイトマップ内の URL が公開時に HTTP 200 を返す
- Netlify の最新 Production deploy が成功している

## Search Console で 5xx が出た場合

1. 対象 URL で「公開 URL をテスト」を実行する
2. 公開テストが成功したら、個別 URL を大量に送信する前に 5xx の問題グループで「修正を検証」を開始する
3. 新規記事など未クロールの URL は必要に応じて「インデックス登録をリクエスト」する
4. 数日から数週間かけて再クロールとインデックス数の推移を確認する

全記事を手動で一件ずつ再送信することを通常運用にはしない。サイトマップ、内部リンク、HTTP 200、canonical が正しければ、Googlebot がまとめて再クロールできる状態になる。

## 変更時の注意

- Pretty URLs と Legacy Prerendering を有効に戻さない
- `.html` なし URL から `.html` あり URL へのリダイレクトを追加する場合は、対象とステータスコードを事前に確認する
- `robots.txt` で `/post/` や `/archive/` をブロックしない
- Netlify の設定変更後は Production deploy と Search Console の公開 URL テストの両方を確認する

## 参考

- [Netlify: File-based configuration / Pretty URLs](https://docs.netlify.com/build/configure-builds/file-based-configuration/#pretty-urls)
