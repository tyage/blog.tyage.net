---
title: cakePHPでURLパラメータを保持する
author: tyage
type: posts
date: 2011-02-06T14:46:29+00:00
url: /?p=260
has_been_twittered:
  - yes
wp-syntax-cache-content:
  - |
    a:3:{i:1;s:1284:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="php" style="font-family:monospace;">// APP/views/pages/index.ctp,
    // APP/views/pages/admin_index.ctp
    &nbsp;
    <span style="color: #000000; font-weight: bold;">&lt;?=</span> <span style="color: #000088;">$html</span><span style="color: #339933;">-&gt;</span><span style="color: #990000;">link</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'hello'</span><span style="color: #339933;">,</span> <span style="color: #990000;">array</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'controller'</span> <span style="color: #339933;">=&gt;</span> <span style="color: #0000ff;">'users'</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">'action'</span> <span style="color: #339933;">=&gt;</span> <span style="color: #0000ff;">'add'</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span> <span style="color: #000000; font-weight: bold;">?&gt;</span></pre></td></tr></table><p class="theCode" style="display:none;">// APP/views/pages/index.ctp,
    // APP/views/pages/admin_index.ctp
    
    &lt;?= $html-&gt;link('hello', array('controller' =&gt; 'users', 'action' =&gt; 'add')) ?&gt;</p></div>
    ";i:2;s:1694:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="php" style="font-family:monospace;">// config/routes.php
    &nbsp;
    <span style="color: #000000; font-weight: bold;">&lt;?php</span>
    <span style="color: #339933;">...</span>
    Router<span style="color: #339933;">::</span><span style="color: #004000;">connect</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'/iframe/:controller'</span><span style="color: #339933;">,</span> <span style="color: #990000;">array</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'iframe'</span> <span style="color: #339933;">=&gt;</span> <span style="color: #009900; font-weight: bold;">true</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    Router<span style="color: #339933;">::</span><span style="color: #004000;">connect</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'/iframe/:controller/:action/*'</span><span style="color: #339933;">,</span> <span style="color: #990000;">array</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'iframe'</span> <span style="color: #339933;">=&gt;</span> <span style="color: #009900; font-weight: bold;">true</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre></td></tr></table><p class="theCode" style="display:none;">// config/routes.php
    
    &lt;?php
    ...
    Router::connect('/iframe/:controller', array('iframe' =&gt; true));
    Router::connect('/iframe/:controller/:action/*', array('iframe' =&gt; true));</p></div>
    ";i:3;s:2778:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="php" style="font-family:monospace;">// controllers/app_controller.php
    &nbsp;
    <span style="color: #000000; font-weight: bold;">&lt;?php</span>
    <span style="color: #339933;">...</span>
    <span style="color: #000000; font-weight: bold;">function</span> beforeFilter<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
    	<span style="color: #b1b100;">if</span> <span style="color: #009900;">&#40;</span><span style="color: #339933;">!</span><span style="color: #990000;">empty</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$this</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">params</span><span style="color: #009900;">&#91;</span><span style="color: #0000ff;">'iframe'</span><span style="color: #009900;">&#93;</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
    		<span style="color: #000088;">$this</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">layout</span> <span style="color: #339933;">=</span> <span style="color: #0000ff;">'iframe'</span><span style="color: #339933;">;</span>
    		Configure<span style="color: #339933;">::</span><span style="color: #004000;">write</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'Routing.prefixes'</span><span style="color: #339933;">,</span> <span style="color: #990000;">array</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'iframe'</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    		<span style="color: #000088;">$router</span> <span style="color: #339933;">=&amp;</span> Router<span style="color: #339933;">::</span><span style="color: #004000;">getInstance</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    		<span style="color: #000088;">$router</span><span style="color: #339933;">-&gt;</span>__setPrefixes<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    	<span style="color: #009900;">&#125;</span>
    <span style="color: #009900;">&#125;</span></pre></td></tr></table><p class="theCode" style="display:none;">// controllers/app_controller.php
    
    &lt;?php
    ...
    function beforeFilter() {
    	if (!empty($this-&gt;params['iframe'])) {
    		$this-&gt;layout = 'iframe';
    		Configure::write('Routing.prefixes', array('iframe'));
    		$router =&amp; Router::getInstance();
    		$router-&gt;__setPrefixes();
    	}
    }</p></div>
    ";}
categories:
  - PHP
tags:
  - cakePHP

---
<p>久しぶりにcakeの記事を書きます。</p>
<p>最近、cakePHP以外のフレームワークにも浮気しようとしているのですが勇気がでません。</p>
<p>要件は<a href="http://tyage.sakura.ne.jp/blog/?p=61">悩み | チャゲってる日々 &#8211; @tyage</a>にて書いてあります。<br />
一応解決したのですが、先ほどの記事を今読むと、かなり意味不明な内容になっているため、簡単にまとめてみます。<br />
<!--more--></p>
<h2>やりたかったこと</h2>
<p>タイトルにあるように、アクセスした際のURLにあるパラメータを保持する方法を探していました。</p>
<p>具体的には、</p>
<p>「/users/view/1」というURLにアクセスして表示される「/users/mail/1」というリンクが、<br />
「/iframe/users/view/1」というURLでアクセスすると、「/iframe/users/mail/1」というリンクに変わるといいなーという話です。</p>
<p>リンクに限らず、formの送信先URL等や、controller側の操作（$this->flashとか）でも適用されてほしいので、<br />
自作Helperを作るだけでは対応しきれません。</p>
<h2>Prefix Routing</h2>
<p>cakePHPにはPrefix Routing機能があります。</p>
<p>その機能の説明は省きますが、その機能によりHTMLヘルパーを使用した際等に、URLに使用中のprefixをつけることができます。</p>
<p>例えば、adminというprefixを使用している時に、</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="php" style="font-family:monospace;">// APP/views/pages/index.ctp,
// APP/views/pages/admin_index.ctp
&nbsp;
<span style="color: #000000; font-weight: bold;">&lt;?=</span> <span style="color: #000088;">$html</span><span style="color: #339933;">-&gt;</span><span style="color: #990000;">link</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'hello'</span><span style="color: #339933;">,</span> <span style="color: #990000;">array</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'controller'</span> <span style="color: #339933;">=&gt;</span> <span style="color: #0000ff;">'users'</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">'action'</span> <span style="color: #339933;">=&gt;</span> <span style="color: #0000ff;">'add'</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span> <span style="color: #000000; font-weight: bold;">?&gt;</span></pre></td></tr></table></div>

<p>という2つの内容の同じviewがあるとします。</p>
<p>その時、/pages/indexというURLでアクセスすると、リンク先は「/users/add」となりますが、<br />
/admin/pages/indexというURLの場合、リンク先は「/admin/users/add」と、prefixのadminが維持される訳です。</p>
<p>しかしここで当たり前なのですが厄介なのが、先ほどの例でadminというprefixをつけた場合、<br />
呼び出されるactionは「index」から「admin_index」となり、<br />
呼び出されるviewも「index.ctp」から「admin_index.ctp」となるため、<br />
prefixごとにactionとviewを作成する必要が出てきます。</p>
<p>なので、今回のように単純にURLにprefixを維持させたい場合にprefixを使うと、無駄な手間がかかることが分かります。</p>
<h2>対策</h2>
<p>今回の場合、prefix機能が働いてほしいのは、URLを整形する際です。<br />
（URLを整形たびに、現在有効なprefixを調べて付加しているようです。）</p>
<p>逆に、呼び出すactionを呼び出すときにprefixが働いてしまうと、やっかいなことになります。</p>
<p>そこで、呼び出すactionが決定した後にprefixを再指定すればいいのでは、という結論に至りました。</p>
<p>とりあえずcakeのコードを調べた結果、以下のようにすれば望んでいたことができるようになりました。</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="php" style="font-family:monospace;">// config/routes.php
&nbsp;
<span style="color: #000000; font-weight: bold;">&lt;?php</span>
<span style="color: #339933;">...</span>
Router<span style="color: #339933;">::</span><span style="color: #004000;">connect</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'/iframe/:controller'</span><span style="color: #339933;">,</span> <span style="color: #990000;">array</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'iframe'</span> <span style="color: #339933;">=&gt;</span> <span style="color: #009900; font-weight: bold;">true</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
Router<span style="color: #339933;">::</span><span style="color: #004000;">connect</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'/iframe/:controller/:action/*'</span><span style="color: #339933;">,</span> <span style="color: #990000;">array</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'iframe'</span> <span style="color: #339933;">=&gt;</span> <span style="color: #009900; font-weight: bold;">true</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre></td></tr></table></div>


<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="php" style="font-family:monospace;">// controllers/app_controller.php
&nbsp;
<span style="color: #000000; font-weight: bold;">&lt;?php</span>
<span style="color: #339933;">...</span>
<span style="color: #000000; font-weight: bold;">function</span> beforeFilter<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
	<span style="color: #b1b100;">if</span> <span style="color: #009900;">&#40;</span><span style="color: #339933;">!</span><span style="color: #990000;">empty</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$this</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">params</span><span style="color: #009900;">&#91;</span><span style="color: #0000ff;">'iframe'</span><span style="color: #009900;">&#93;</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
		<span style="color: #000088;">$this</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">layout</span> <span style="color: #339933;">=</span> <span style="color: #0000ff;">'iframe'</span><span style="color: #339933;">;</span>
		Configure<span style="color: #339933;">::</span><span style="color: #004000;">write</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'Routing.prefixes'</span><span style="color: #339933;">,</span> <span style="color: #990000;">array</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'iframe'</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
		<span style="color: #000088;">$router</span> <span style="color: #339933;">=&amp;</span> Router<span style="color: #339933;">::</span><span style="color: #004000;">getInstance</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
		<span style="color: #000088;">$router</span><span style="color: #339933;">-&gt;</span>__setPrefixes<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	<span style="color: #009900;">&#125;</span>
<span style="color: #009900;">&#125;</span></pre></td></tr></table></div>

<p>「config/routes.php」にてiframe prefixがあるかどうかをパラメータで指定し、<br />
その後controller側で無理やり新しいprefixをRouterに叩き込んでいます。</p>
<p>これで、「インラインフレームでアクセスしたときだけレイアウトを変える」ということができます！<br />
（※ただしそのアプリ内のURLに限る）</p>
<h2>結論</h2>
<p>やっぱり上手く説明できない</p>
