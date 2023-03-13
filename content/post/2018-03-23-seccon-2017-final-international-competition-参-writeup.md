---
title: SECCON 2017 Final International competition – 参 writeup
author: tyage
type: post
date: 2018-03-22T15:20:40+00:00
url: /?p=1138
hestia_layout_select:
  - default
categories:
  - CTF

---
<p>SECCON 2017国際決勝に参加した。</p>
<p>5種類のKoH形式の問題と、いくつかのJeopardy形式の問題が出題された。</p>
<p>問題参(KoH)の問題文:</p>
<blockquote><p>
The Raspberry Pi distributed to each team contains the Bingo-Service program<br />
Please log-in your Raspberry Pi ( ssh: 192.168.4.254, user/pass = pi/kenjiinwonderland )<br />
Please set up Bingo-Service on 192.168.4.254 : 80<br />
If you click &#8220;Measure&#8221; button above, the system will accesses your Bingo-Service in a few minutes later<br />
&#8220;Measure&#8221; button can be clicked once every 7 minutes (Once you click it, you have to wait for 7 minutes)<br />
Even if you do not click &#8220;Measure&#8221; button, the system may occasionally access your Bingo-Service<br />
Response time of your service is measured<br />
The hash of the team with the shortest response time is automatically written to flag.cgi<br />
In this challenge, players do not need to write &#8220;Team Hash&#8221; on a regular basis<br />
You will get a keyword for an attack point, if &#8220;Response Time&#8221; of your service is less than 20.0<br />
checker.py in Raspberry Pi, is different from we used for accessing your service</p></blockquote>
<p>要約すると</p>
<ul>
<li>各チームに配られたRaspberry Piでサービスが動いている</li>
<li>計測ボタンを押すとそのチームのサービスのレスポンスタイムが上書きされる</li>
<li>計測は7分に一度できる</li>
<li>5分毎に得られるdefence pointは、その時点で一番良い記録を出しているチームが得る</li>
</ul>
<p>ISUCONだった。</p>
<p>Raspberry Piからサービスのデータを引き出したところ、<a href="https://gist.github.com/tyage/e73e049cc930dcbc7c12de3c485ff0c6#file-bingo-cgi">bingo.cgi</a>というビンゴカードを生成してビンゴに穴を空けていくサービスが動いている。<br />
<a href="https://gist.github.com/tyage/e73e049cc930dcbc7c12de3c485ff0c6#file-checker-py">checker.py</a>という動作チェック用のスクリプトもあったのだけど、実際の動作チェックに使われているものとは異なるらしい&#8230;</p>
<p>ビンゴサービスには2つの機能がある。</p>
<dl>
<dt>初期化: /cgi-bin/bingo.cgi?num=[number of cards]</dt>
<dd>ビンゴカードを<code>num</code>個生成(ビンゴ画像を作る)</dd>
<dt>ビンゴ更新: /cgi-bin/bingo.cgi?uid=[uid]&#038;call=[called number]</dt>
<dd>ビンゴの<code>call</code>番を開ける(ビンゴ画像を更新)</dd>
</dl>
<h3>1日目 12時</h3>
<p>まずはRaspberry Piを除外して自分のノートパソコンでサービスを動かし、計測。<br />
（つまり、めっちゃいいマシン持っていれば有利になる）<br />
以下のHTTPリクエストが来ることが分かる。</p>
<ul>
<li>初期化: /cgi-bin/bingo.cgi?num=100 * 1 req</li>
<li>確認: /pics/[uid]/[imageid]/305.jpg * 100 req</li>
<li>ビンゴ更新: /cgi-bin/bingo.cgi?uid=[uid]&#038;call=[called number] * 5 req</li>
<li>確認: /pics/[uid]/[imageid]/305.jpg * 5 req</li>
</ul>
<p>とりあえず全てのリクエストに対するレスポンスを、計測前に用意したものを返すだけで通った。</p>
<p>結果、3.08711481094秒で1位。</p>
<h3>1日目 13時</h3>
<p>何度か計測すればもっといいスコアが出るかと重い、再計測したところfail。<br />
なんで？</p>
<p>その後、再計測を続けたがfailしたため、プログラムをちゃんと高速化する方針に変更。</p>
<h3>1日目 16時</h3>
<p>Jeopardyで出題された問題のサーバからであれば、他チームのbingoサーバにアクセスできることが判明。</p>
<p>この時点で1位のチームのサーバにアクセスしたところ、ビンゴ更新時には、既にcallされた数字のデータだけがチェックされていると判明。</p>
<p><a href="https://gist.github.com/tyage/a520c7c6e3f8ee765c75280f2c417f6b/77c6e3034bd1616bd888b1bd0cecfad0323c4b69#file-bingo-cgi-L207">ビンゴ更新で画像を生成しないようにする</a>ことで1.49秒になったものの、他チームのスコアに勝てず、1日目終了。</p>
<h3>2日目 10時</h3>
<p>スコアがリセットされ、チェッカーの挙動が変わり、動かなくなる。<br />
ついでにリクエストの数も増える。</p>
<ul>
<li>初期化: /cgi-bin/bingo.cgi?num=200 * 1 req</li>
<li>確認: /pics/[uid]/[imageid]/305.jpg * 200 req</li>
<li>ビンゴ更新: /cgi-bin/bingo.cgi?uid=[uid]&#038;call=[called number] * 25 req</li>
<li>確認: /pics/[uid]/[imageid]/305.jpg * 25 req</li>
</ul>
<p>ビンゴの更新ごとに画像を正しく生成して返す必要がある。<br />
回避策をいろいろ試してみるがfailしまくる。</p>
<h3>2日目 13時</h3>
<p>生成した画像をファイルに書き出さずにメモリに持つことにする。<br />
レスポンスを圧縮する。</p>
<h3>2日目 15時</h3>
<p>30文字ある<code>imageid</code>や<code>uid</code>を短くする。</p>
<p>ビンゴの更新後の画像の確認リクエスト時に、オンデマンドに画像を生成するようにする。</p>
<p><a href="https://gist.github.com/tyage/a520c7c6e3f8ee765c75280f2c417f6b">https://gist.github.com/tyage/a520c7c6e3f8ee765c75280f2c417f6b</a></p>
<p>結果、2.96392202377秒 を記録するが、1位になるには0.8秒足りない。（マシンスペックの差もありそう&#8230;）</p>
<h3>2日目 16時</h3>
<p>全てのアプリケーションを落とし、配布された扇子で仰いでいたら 2.76775598526秒 を記録するが、微妙に勝てない。</p>
<blockquote class="twitter-tweet" data-lang="ja">
<p lang="ja" dir="ltr">SECCON国際決勝でISUCONが発生したため、ノートPCを扇いでスピードを上げようとしている図です <a href="https://t.co/QUZjtvzU6G">pic.twitter.com/QUZjtvzU6G</a></p>
<p>&mdash; 本格手打ち麺 (@tyage) <a href="https://twitter.com/tyage/status/965569176285753345?ref_src=twsrc%5Etfw">2018年2月19日</a></p></blockquote>
<p><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p>
<h2>感想</h2>
<p>7分に一度しか計測できない縛りが地味に苦しかった。</p>
<p>初めになぜか通った計測結果をそのまま保持していれば、ポイントをかなり獲得できた気がするので反省。</p>
<p>もっといいマシンを使っていれば勝てたのかな〜というのが気になる。</p>
