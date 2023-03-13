---
title: Bottom Coder++
author: tyage
type: post
date: 2010-11-07T14:39:07+00:00
url: /?p=95
has_been_twittered:
  - yes
categories:
  - 開発
tags:
  - MA6

---
<p>今日はBottomCoderのアップデートも行いました。</p>
<p><a href="http://tyage.sakura.ne.jp/bottom/">Bottom Coder Home</a></p>
<p>MA6に何か提出しようと思い、APIを探していたところ、子飼弾さんのLLEvalがBottom Coderに使えそうだったので早速オンラインテスト機能として採用してみました。<br />
<a href="http://ma6api.mashupaward.jp/entry/71601/">小飼弾（LLEval） | 提供API一覧 | Mashup Awards 6 (#MA6) on CREYLE</a></p>
<h2>BottomCoderとは：</h2>
<p>世界的なプログラミングコンテストであるTop CoderのWeb版みたいなもんです。</p>
<p>@asi1024　から意見をもらって作ってみました。</p>
<p>今のところチャットと、問題を解くことしかできません。</p>
<p>今回は問題を解くに当たって、自前の環境を用意せずとも、オンラインで自分のコードをテストできるようにしました。<br />
この処理に、先ほど言ったLLEvalを採用しています。<br />
クロスオリジンXHRを使っているので、少しブラウザが制限されますが、プログラマならきっと最新のブラウザを使っているでしょうし、そこは問題なしとします。</p>
<p>また、システムテストもLLEvalを使って実行してもらい、答えと一致しているか判別しています。</p>
<p><!--more--></p>
<h2>スクリーンショット</h2>
<style type='text/css'>#my-screenshots img {border: 5px solid #aaa;width:450px;}</style>
<div id='my-screenshots'>
<p>左上の登録リンクから登録を開始します。<br />
<a href='http://pckles.com/tyage/a41a0a.png'><img src='http://pckles.com/tyage/a41a0a.png'></a></p>
<p>ユーザー名とパスワードを入力するだけです。<br />
<a href='http://pckles.com/tyage/cc6b1d.png'><img src='http://pckles.com/tyage/cc6b1d.png'></a></p>
<p>登録を済ませ、ログインすると、このようにチャットに書き込んだり、左の問題一覧から問題が解けるようになります。<br />
<a href='http://pckles.com/tyage/96599f.png'><img src='http://pckles.com/tyage/96599f.png'></a></p>
<p>問題画面上部はこのようになっております。<br />
<a href='http://pckles.com/tyage/ca318e.png'><img src='http://pckles.com/tyage/ca318e.png'></a></p>
<p>問題画面下部からオンラインテストを実行することができます。<br />
<a href='http://pckles.com/tyage/ef51d2.png'><img src='http://pckles.com/tyage/ef51d2.png'></a></p>
<p>答えを入力して、「テスト」ボタンを押すと、テストが通ったかどうかが分かります。<br />
<a href='http://pckles.com/tyage/9a5fd8.png'><img src='http://pckles.com/tyage/9a5fd8.png'></a></p>
<p>問題を投稿した後でも、自分の投稿であれば閲覧することが可能です。<br />
<a href='http://pckles.com/tyage/7c0b14.png'><img src='http://pckles.com/tyage/7c0b14.png'></a></p>
</div>
