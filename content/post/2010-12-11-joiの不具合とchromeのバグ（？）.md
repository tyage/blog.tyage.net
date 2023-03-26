---
title: JOIの解答がGoogle Chromeで提出できないという話
author: tyage
type: post
date: 2010-12-11T07:57:07+00:00
url: /archive/p164.html
has_been_twittered:
  - yes
categories:
  - 情報オリンピック
tags:
  - Google Chrome
  - JOI

---
<p><a href="http://www.ioi-jp.org/">情報オリンピック日本委員会</a></p>
<h2>現象</h2>
<p>なーんかJOIの予選練習問題解いてたら、@asi1024がChromeでCのソースコードをアップできないって言うんで、どういうことかなーって思ってたら、後日JOIから発表があった。</p>
<p><!-- http://twitter.com/#!/ioi_jp/status/12301709980209152 --> </p>
<style type='text/css'>.bbpBox12301709980209152 {background:url(http://s.twimg.com/a/1291163542/images/themes/theme19/bg.gif) #FFF04D;padding:20px;} p.bbpTweet{background:#fff;padding:10px 12px 10px 12px;margin:0;min-height:48px;color:#000;font-size:18px !important;line-height:22px;-moz-border-radius:5px;-webkit-border-radius:5px} p.bbpTweet span.metadata{display:block;width:100%;clear:both;margin-top:8px;padding-top:12px;height:40px;border-top:1px solid #fff;border-top:1px solid #e6e6e6} p.bbpTweet span.metadata span.author{line-height:19px} p.bbpTweet span.metadata span.author img{float:left;margin:0 7px 0 0px;width:38px;height:38px} p.bbpTweet a:hover{text-decoration:underline}p.bbpTweet span.timestamp{font-size:12px;display:block}</style>
<div class='bbpBox12301709980209152'>
<p class='bbpTweet'>「予選練習」において， Google Chrome  (7.0 以降)など一部のブラウザからソースコードのアップロードが正常に行えない場合があることが確認されています．<br />
競技当日までに競技に使用するPCから予選練習にてソースコードのアップロードが<br />
正常に行えるか確認してください．<span class='timestamp'><a title='Wed Dec 08 00:25:30 +0000 2010' href='http://twitter.com/#!/ioi_jp/status/12301709980209152'>less than a minute ago</a> via <a href="http://www.hootsuite.com" rel="nofollow">HootSuite</a></span><span class='metadata'><span class='author'><a href='http://twitter.com/ioi_jp'><img src='http://a2.twimg.com/profile_images/635143610/JOIlogo_color_100_normal.png' /></a><strong><a href='http://twitter.com/ioi_jp'>JOI / IOI-JP 科学委員会</a></strong><br />ioi_jp</span></span></p>
</div>
<p> <!-- end of tweet --></p>
<p>どうやらChromeだけの現象らしい。<br />
しかも.txtファイルはアップできて、.cファイル等がアップできないという不思議な現象。<br />
.c等のファイルをアップロードしようとすると以下のようにエラーがでる。<br />
（JOIからの報告の数日後に、サイトの保守作業があったみたいだけど、まだバグは治っていなかった）<br />
<img src='http://gyazo.com/b49a68cdd279dd6ea3822e2bc4077d04.png'></p>
<p>原因らしきものをぐぐってみたら、さくっと出てきた。</p>
<p><a href="http://www.google.com/support/forum/p/chrome/thread?tid=6591ef984be47894&#038;hl=ja">一般に登録されていない拡張子の場合、Chromeでアップロードできない &#8211; Google Chrome 公式ヘルプフォーラム</a></p>
<p>もしかしたらもう解決済みなのかな？とは思ったものの、ちょっと調べてみた。<br />
Chromeのバージョンは8.0.552.215 beta</p>
<h2>「Content-Typeフィールド」が無い</h2>
<p>プロキシツールを使って、sample.txtファイルをアップしたときと、sample.cファイルをアップしたときの違いを見てみた。<br />
どうやらレスポンスヘッダーの「Content-Typeフィールド」の付与の有無が関わってることが分かった。<br />
一般に登録されてない拡張子だと「Content-Typeフィールド」が付与されないみたい。<br />
（他のブラウザだと、どのファイルでも「Content-Typeフィールド」が付与されるようだ。）</p>
<p>（比較）<br />
<img src='http://gyazo.com/21a519882d97ec91b0faaa872eceb59c.png'></p>
<p>「Content-Typeフィールド」を適当に付け加えるとアップロードできるようになった。</p>
<h2>あとがき</h2>
<p>今までChromeを使ってても、dropboxも使えたし、なんら問題がなかったので、ちょっと驚き。<br />
ちなみにdropboxでアップロードするときも、「一般に登録されてない拡張子」だと「Content-Typeフィールド」が付与されなかった。<br />
JOIの鯖側で「Content-Typeフィールド」のチェックでもしてるのかしら。</p>
<p>それにしてもJOIさん、font要素とかまじで使わないでください。</p>
<h3>追伸</h3>
<p>どうやらChromeのバグだったようです。<br />
<a href="http://code.google.com/p/chromium/issues/detail?id=6800">Issue 6800 &#8211; chromium &#8211; Chrome doesn&apos;t set Content-Type for file upload when the file extension is not recognized. &#8211; Project Hosting on Google Code</a></p>
<p>一度直されたバグが復活したのかな？<br />
今後直されるといいですが・・・</p>
<p>thanks to <a href='http://b.hatena.ne.jp/Pasta-K/20101211#bookmark-27218609'>@pastak</a></p>
