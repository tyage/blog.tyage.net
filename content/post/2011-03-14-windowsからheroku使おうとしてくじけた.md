---
title: WindowsからHeroku使おうとしてくじけた
author: tyage
type: post
date: 2011-03-14T12:08:01+00:00
url: /?p=290
has_been_twittered:
  - yes
wp-syntax-cache-content:
  - |
    a:1:{i:1;s:718:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="line_numbers"><pre>41
    </pre></td><td class="code"><pre class="ruby" style="font-family:monospace;">	  home_directory = home_directory.<span style="color:#CC0066; font-weight:bold;">split</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#996600;">&quot;<span style="color:#000099;">&quot;</span>).join(&quot;</span><span style="color:#006600; font-weight:bold;">/</span><span style="color:#996600;">&quot;) if !home_directory.nil?</span></pre></td></tr></table><p class="theCode" style="display:none;">	  home_directory = home_directory.split(&quot;&quot;).join(&quot;/&quot;) if !home_directory.nil?</p></div>
    ";}
categories:
  - Ruby
tags:
  - Heroku
  - Rails
  - Ruby
  - Windows

---
<p>HerokuいいですよねHeroku！</p>
<p>今回はRedMineをHerokuで使おうと思いまして、Windows環境からトライしてみました。<br />
（結局失敗したため、おとなしくUbuntuから使うことにしました。）</p>
<p>普通は<a href="http://devcenter.heroku.com/articles/quickstart">Heroku | Dev Center | Getting Started with Heroku</a>を見ればできるはず。</p>
<p>とりあえず一連の流れを</p>
<p>rubyを<a href="http://rubyinstaller.org/">RubyInstaller for Windows</a>を使ってインストール。</p>
<p>ついでにgemとかもついてくるので、すぐにrailsをインストールすることから始められる。</p>
<pre>
gem update
gem install rails
gem install
heroku keys:add
</pre>
<p>が、ここでメールアドレスとパスワードを入れたところでエラー</p>
<pre>
C:/Ruby192/lib/ruby/gems/1.9.1/gems/heroku-1.18.3/lib/heroku/commands/auth.rb:17
2:in `chmod': No such file or directory - C:Documents and Settingsユーザー名/.he
roku/credentials (Errno::ENOENT)
</pre>
<p>Windowsのフォルダのセパレータが違うのかなと思い、auth.rbに</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="line_numbers"><pre>41
</pre></td><td class="code"><pre class="ruby" style="font-family:monospace;">	  home_directory = home_directory.<span style="color:#CC0066; font-weight:bold;">split</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#996600;">&quot;<span style="color:#000099;">&quot;</span>).join(&quot;</span><span style="color:#006600; font-weight:bold;">/</span><span style="color:#996600;">&quot;) if !home_directory.nil?</span></pre></td></tr></table></div>

<p>と入れてみたのだけども、「Internal server error」が出て上手く行かなかった模様。<br />
うぬー。。</p>
