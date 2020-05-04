---
title: CSP Embedded EnforcementでXSS mitigationをbypassする話
author: tyage
type: posts
date: 2018-06-26T15:11:37+00:00
url: /?p=1187
hestia_layout_select:
  - default
wp-syntax-cache-content:
  - |
    a:3:{i:1;s:516:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">&lt;iframe src=&quot;VULNERABLE_PAGE?xss=&lt;script nonce=12345&gt;alert(document.cookie)&lt;/script&gt;&quot; csp=&quot;script-src 'nonce-12345';&quot;&gt;</pre></td></tr></table><p class="theCode" style="display:none;">&lt;iframe src=&quot;VULNERABLE_PAGE?xss=&lt;script nonce=12345&gt;alert(document.cookie)&lt;/script&gt;&quot; csp=&quot;script-src 'nonce-12345';&quot;&gt;</p></div>
    ";i:2;s:1466:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="javascript" style="font-family:monospace;">meta <span style="color: #339933;">=</span> document.<span style="color: #660066;">createElement</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'meta'</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    meta.<span style="color: #660066;">httpEquiv</span><span style="color: #339933;">=</span><span style="color: #3366CC;">'Content-Security-Policy'</span><span style="color: #339933;">;</span>
    meta.<span style="color: #660066;">content</span><span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;script-src 'nonce-77aae8705604c721a0c4bb7b9e3088976c2b44a1bb74c7624b37ed853cdf5b4f_profilephp_7f666d4acbd2c9163a5c4aad1747c7fc'&quot;</span><span style="color: #339933;">;</span>
    document.<span style="color: #660066;">head</span>.<span style="color: #660066;">appendChild</span><span style="color: #009900;">&#40;</span>meta<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre></td></tr></table><p class="theCode" style="display:none;">meta = document.createElement('meta');
    meta.httpEquiv='Content-Security-Policy';
    meta.content=&quot;script-src 'nonce-77aae8705604c721a0c4bb7b9e3088976c2b44a1bb74c7624b37ed853cdf5b4f_profilephp_7f666d4acbd2c9163a5c4aad1747c7fc'&quot;;
    document.head.appendChild(meta);</p></div>
    ";i:3;s:418:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">&lt;iframe src=&quot;/profile.php?id=id_to_xssed_page&quot; csp=&quot;script-src 'unsafe-inline';&quot;&gt;</pre></td></tr></table><p class="theCode" style="display:none;">&lt;iframe src=&quot;/profile.php?id=id_to_xssed_page&quot; csp=&quot;script-src 'unsafe-inline';&quot;&gt;</p></div>
    ";}
categories:
  - CTF

---
<h2>なに</h2>
<p>CSP Embedded Enforcementを使って、JavaScriptで書かれたXSS mitigationをbypassできるパターンがあるという話。<br />
以下のような条件が必要なので現実に使える場面は普通はなさそう。<br />
CTFでは便利かもしれない。</p>
<ul>
<li>Webページで同一オリジンのページをiframeで読み込める</li>
<li>WebページのヘッダにCSPが設定されていない</li>
<li>Webページに指定したHTMLを埋め込める(XSSができる)</li>
<li>ただし、WebページにJavaScriptによるXSS防御機構がある</li>
</ul>
<p>このとき、CSP Embedded Enforcementを使うことで、防御機構を回避して攻撃コードだけを実行することができる。</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">&lt;iframe src=&quot;VULNERABLE_PAGE?xss=&lt;script nonce=12345&gt;alert(document.cookie)&lt;/script&gt;&quot; csp=&quot;script-src 'nonce-12345';&quot;&gt;</pre></td></tr></table></div>

<h2>h4x0rs.date</h2>
<p>と、言うのが0CTF 2018 finalsで出題されたh4x0rs.dateという問題で使えたテクニックでした。</p>
<p>問題の解説は<a href="https://github.com/l4wio/CTF-challenges-by-me/blob/master/0ctf_final-2018/0ctf_tctf_2018_slides.pdf">ここ</a>にあるけど、XSSの可能なページが以下のJavaScript(csp.js)によって保護されているというものです。</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="javascript" style="font-family:monospace;">meta <span style="color: #339933;">=</span> document.<span style="color: #660066;">createElement</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'meta'</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
meta.<span style="color: #660066;">httpEquiv</span><span style="color: #339933;">=</span><span style="color: #3366CC;">'Content-Security-Policy'</span><span style="color: #339933;">;</span>
meta.<span style="color: #660066;">content</span><span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;script-src 'nonce-77aae8705604c721a0c4bb7b9e3088976c2b44a1bb74c7624b37ed853cdf5b4f_profilephp_7f666d4acbd2c9163a5c4aad1747c7fc'&quot;</span><span style="color: #339933;">;</span>
document.<span style="color: #660066;">head</span>.<span style="color: #660066;">appendChild</span><span style="color: #009900;">&#40;</span>meta<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre></td></tr></table></div>

<p>このcsp.jsがhead内で読み込まれCSPが設定されることにより、攻撃コードの実行が阻止される。(nonceは読み込むたびに変化する)<br />
想定解としては、csp.jsに <code>Cache-Control: max-age=20</code> がついているので、うまくnonceを漏洩させてキャッシュの有効なうちにXSSするというもの。</p>
<p><a href="https://github.com/l4wio/CTF-challenges-by-me/blob/master/0ctf_final-2018/h4x0rs.date.MD">こういう問題設定だとCSP Embedded Enforcementを使って簡単に解けるということに気づきました。</a><br />
profile.phpに以下のようなiframeを埋め込めば、csp.jsの読み込みが阻止され、攻撃コードを実行できます。<br />
便利ですね。</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">&lt;iframe src=&quot;/profile.php?id=id_to_xssed_page&quot; csp=&quot;script-src 'unsafe-inline';&quot;&gt;</pre></td></tr></table></div>

<h2>CSP Embedded Enforcement</h2>
<p>この解き方を見つけた時はCSP Embedded Enforcementを知らなかったんですけど、iframeで埋め込む側がCSPを提案するという仕様らしいですね。へー。</p>
<p>cross originだとリクエスト時の<code>Sec-Required-CSP</code>ヘッダで提案するだけなんですが、same originだと勝手にCSPがつくみたいです。</p>
<p>同じページでもstyleのない状態にするとかできます。<br />
<script async src="//jsfiddle.net/ad4jygfk/21/embed/result,html,css/"></script></p>
<p><code>document.body.innerHTML = removeXSS(document.body.innerHTML)</code> みたいなのがbodyの先頭で呼ばれているとかだと回避できるかも。</p>
<p>もうちょい面白い使い方があればいいんですが、パッと思いつかないですね。<br />
覚えておけばそのうち使えるかもしれない？</p>
