---
title: google mapsでマーカーに文字を表示させたい
author: tyage
type: post
date: 2011-01-19T15:10:49+00:00
url: /?p=243
has_been_twittered:
  - yes
categories:
  - メモ
  - 開発
tags:
  - Google Maps

---
<p>たとえばマーカーのアイコン画像の下に文字を表示したい。</p>
<p>こんな感じに<br />
<a href="https://blog.tyage.net/wp-content/uploads/2011/01/maps.png"><img data-attachment-id="244" data-permalink="https://blog.tyage.net/?attachment_id=244" data-orig-file="https://blog.tyage.net/wp-content/uploads/2011/01/maps.png" data-orig-size="370,330" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="maps" data-image-description="" data-medium-file="https://blog.tyage.net/wp-content/uploads/2011/01/maps.png" data-large-file="https://blog.tyage.net/wp-content/uploads/2011/01/maps.png" src="https://blog.tyage.net/wp-content/uploads/2011/01/maps.png" alt="" title="maps" width="370" height="330" class="alignnone size-full wp-image-244" /></a></p>
<p>この画像ではマーカーの代わりにoverlayViewを継承したカスタムオーバーレイを使っている。</p>
<p>実際そうすれば問題はないんだけど、そうなると<a href='http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/docs/reference.html'>MarkerClustererライブラリ</a>が使えない。</p>
<p>どうしても使いたい。<br />
代わりになるものがあればそれでいいけど。。</p>
<p>あきらめてcanvasに文字を書いてdataスキームで画像として表示するとか・・・？</p>
