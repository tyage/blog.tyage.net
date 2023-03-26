---
title: Atomエディタ用にVideo player pluginを作りました
author: tyage
type: post
date: 2014-07-26T03:48:14+00:00
url: /archive/p790.html
categories:
  - 開発

---
<p><img src="https://cloud.githubusercontent.com/assets/177858/3700235/a8a91544-13dd-11e4-98f9-7c8448cc2041.gif"></p>
<p>コーディング中でも動画が見たい人種に向けたプラグインです。</p>
<p>BGA（background animation）を流しながらコードを書いたりすることが多いのですが、せっかくならエディタの背景で流したいですよね。</p>
<p>ということで作ってみました。</p>
<p><a href="https://atom.io/packages/video-player">pluginページ: video-player</a></p>
<h2>使い方</h2>
<ol>
<li>vlcの実行ファイルへのパスを設定 (Macならデフォルト値が設定されています)</li>
<li>&#8220;Video Player: Play&#8221; コマンドを実行</li>
<li>動画ファイルを選択</li>
<li>&#8220;Video Player: Stop&#8221; コマンドで終了</li>
</ol>
<h2>再生できる動画</h2>
<p>video要素を利用しているだけなので、音声もちゃんと流れます。</p>
<p>Atomはchromiumベースなのでogg, webm, wavが再生できるのですが、mp4等には対応していません。</p>
<p>chromiumで対応していない形式に関しては、vlcを呼び出してogg形式に変換しつつ配信しています。</p>
<p>そのため、vlcで再生可能な形式ならなんでも再生できます。（画像もいけます。）</p>
<h2>今後のアップデート</h2>
<p>コントローラを出すとか、複数動画連続再生に対応するとかは考えています。</p>
<p>バグ報告等はgithubのissueに投げてください。</p>
<p>pull requestも受け付けています。</p>
<h2>その他</h2>
<p>他に同じようなエディタプラグインあったら参考にしたいので教えてください。</p>
<p>正直、背景で動画流れてると集中できない気もする。</p>
