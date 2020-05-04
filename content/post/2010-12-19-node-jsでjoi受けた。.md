---
title: node.jsでJOI受けた。
author: tyage
type: post
date: 2010-12-19T08:22:24+00:00
url: /?p=188
has_been_twittered:
  - yes
categories:
  - JavaScript
  - 情報オリンピック
tags:
  - JOI

---
<p><a href="http://www.ioi-jp.org/">情報オリンピック日本委員会</a></p>
<p>PHPを使うか、ブラウザのコンソール画面でJavaScript実行させるか、node.jsを使うかで悩んだ末、勉強もかねてnode.jsを使いました。</p>
<p>結果はかなり微妙でしたが、node.jsの勉強になったと思うので、よしとします。<br />
予選通過するかしないかギリギリのラインですが、どっかでミスってる可能性大なので、たぶん通過しません。</p>
<p>残ってるコードはこんな感じ</p>
<p>&#8211; Q1<br />
<script src="https://gist.github.com/747193.js?file=joi-2010-1.js"></script></p>
<p>&#8211; Q2<br />
<script src="https://gist.github.com/747194.js?file=joi-2010-2.js"></script></p>
<p>&#8211; Q3<br />
<script src="https://gist.github.com/747195.js?file=joi-2010-3.js"></script></p>
<p>Q4は二問ほどを総当り（ブルートフォース的に）解いて、残りを解くために改良していたところで、バグに見舞われてしまい、終了となりました。<br />
Q5もはじめの一問を解いたけど、たぶん点数に加算されない気がするなあ。</p>
<p>Q2を解き始めたところから、「split(&#8216;n&#8217;)」で一行ずつ取得という処理ができなくなり、そこでも時間を潰したかな。<br />
rnでsplitしても、また別の問題が浮上してくるのですごく戸惑いました。<br />
最終的にはダウンロードした入力データを、エディタで改行を除くなどして応急処置をほどこしました。</p>
<p>向こうの想定するC,C++ではなくて、node.jsで解いた罰かもしれんねー</p>
<p>まあこれで、アリ本を買うことなんかは今後もないでしょう</p>
