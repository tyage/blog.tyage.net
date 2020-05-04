---
title: さくらのvps契約+node.js
author: tyage
type: post
date: 2012-08-09T15:42:45+00:00
url: /?p=497
wp-syntax-cache-content:
  - |
    a:8:{i:1;s:761:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;">useradd <span style="color: #7a0874; font-weight: bold;">&#91;</span>user<span style="color: #7a0874; font-weight: bold;">&#93;</span>
    <span style="color: #c20cb9; font-weight: bold;">passwd</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span>user<span style="color: #7a0874; font-weight: bold;">&#93;</span>
    usermod <span style="color: #660033;">-G</span> wheel <span style="color: #7a0874; font-weight: bold;">&#91;</span>user<span style="color: #7a0874; font-weight: bold;">&#93;</span></pre></td></tr></table><p class="theCode" style="display:none;">useradd [user]
    passwd [user]
    usermod -G wheel [user]</p></div>
    ";i:2;s:476:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">vim</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>ssh<span style="color: #000000; font-weight: bold;">/</span>sshd_config</pre></td></tr></table><p class="theCode" style="display:none;">vim /etc/ssh/sshd_config</p></div>
    ";i:3;s:1333:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">ssh-keygen</span> <span style="color: #660033;">-t</span> rsa <span style="color: #660033;">-C</span> <span style="color: #ff0000;">&quot;[email]&quot;</span>
    <span style="color: #c20cb9; font-weight: bold;">scp</span> ~<span style="color: #000000; font-weight: bold;">/</span>.ssh<span style="color: #000000; font-weight: bold;">/</span>id_rsa.pub <span style="color: #7a0874; font-weight: bold;">&#91;</span>user<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #000000; font-weight: bold;">@</span><span style="color: #7a0874; font-weight: bold;">&#91;</span>host<span style="color: #7a0874; font-weight: bold;">&#93;</span>:<span style="color: #000000; font-weight: bold;">/</span>home<span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#91;</span>user<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #000000; font-weight: bold;">/</span>authorized_keys</pre></td></tr></table><p class="theCode" style="display:none;">ssh-keygen -t rsa -C &quot;[email]&quot;
    scp ~/.ssh/id_rsa.pub [user]@[host]:/home/[user]/authorized_keys</p></div>
    ";i:4;s:851:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #007800;">$HOME</span>
    <span style="color: #c20cb9; font-weight: bold;">mkdir</span> .ssh
    <span style="color: #c20cb9; font-weight: bold;">chmod</span> <span style="color: #000000;">700</span> .ssh
    <span style="color: #c20cb9; font-weight: bold;">chmod</span> <span style="color: #000000;">600</span> authorized_keys
    <span style="color: #c20cb9; font-weight: bold;">mv</span> authorized_keys .ssh<span style="color: #000000; font-weight: bold;">/</span>authorized_keys</pre></td></tr></table><p class="theCode" style="display:none;">cd $HOME
    mkdir .ssh
    chmod 700 .ssh
    chmod 600 authorized_keys
    mv authorized_keys .ssh/authorized_keys</p></div>
    ";i:5;s:476:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">vim</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>ssh<span style="color: #000000; font-weight: bold;">/</span>sshd_config</pre></td></tr></table><p class="theCode" style="display:none;">vim /etc/ssh/sshd_config</p></div>
    ";i:6;s:420:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>sshd restart</pre></td></tr></table><p class="theCode" style="display:none;">/etc/init.d/sshd restart</p></div>
    ";i:7;s:1109:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">wget</span> http:<span style="color: #000000; font-weight: bold;">//</span>nodejs.tchol.org<span style="color: #000000; font-weight: bold;">/</span>repocfg<span style="color: #000000; font-weight: bold;">/</span>el<span style="color: #000000; font-weight: bold;">/</span>nodejs-stable-release.noarch.rpm
    <span style="color: #c20cb9; font-weight: bold;">yum localinstall</span> <span style="color: #660033;">--nogpgcheck</span> nodejs-stable-release.noarch.rpm
    <span style="color: #c20cb9; font-weight: bold;">yum install</span> nodejs-compat-symlinks npm
    <span style="color: #c20cb9; font-weight: bold;">rm</span> nodejs-stable-release.noarch.rpm</pre></td></tr></table><p class="theCode" style="display:none;">wget http://nodejs.tchol.org/repocfg/el/nodejs-stable-release.noarch.rpm
    yum localinstall --nogpgcheck nodejs-stable-release.noarch.rpm
    yum install nodejs-compat-symlinks npm
    rm nodejs-stable-release.noarch.rpm</p></div>
    ";i:8;s:780:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">git init</span>
    <span style="color: #c20cb9; font-weight: bold;">git clone</span> git:<span style="color: #000000; font-weight: bold;">//</span>github.com<span style="color: #000000; font-weight: bold;">/</span>tyage<span style="color: #000000; font-weight: bold;">/</span>nekomeshi.git
    <span style="color: #7a0874; font-weight: bold;">cd</span> nekomeshi
    npm <span style="color: #c20cb9; font-weight: bold;">install</span>
    node app.js</pre></td></tr></table><p class="theCode" style="display:none;">git init
    git clone git://github.com/tyage/nekomeshi.git
    cd nekomeshi
    npm install
    node app.js</p></div>
    ";}
categories:
  - 開発

---
<p>ふと思い立って、node.jsで再開発したゲームをherokuで動かしていたのですが、当然重たくなってきたためさくらのvpsを契約しました。<br />
自分自身、数年前に似たようなネタをやっており、ネタとしてはずいぶんと古い気がするのですが、最近はほとんどコーディングしていないことの反省も込めて・・・</p>
<p>　</p>
<h2>環境</h2>
<dl>
<dt>VPS の OS</dt>
<dd>CentOS 6.2 x86_64</dd>
<dt>クライアント の OS</dt>
<dd>Ubuntu 12.04 LTS 64 bit</dd>
<dt>node.js</dt>
<dd>v0.6.18</dd>
</dl>
<p>　</p>
<h2>設定</h2>
<p><a href="http://wp.yat-net.com/?p=3074">さくらVPSで使うコマンドリストとサーバーの初期設定</a>を主に参考にしています。<br />
公開鍵認証にしてあるならport番号の変更とかは必要ないような気もするのですが一応。</p>
<h3>作業用ユーザーの追加</h3>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;">useradd <span style="color: #7a0874; font-weight: bold;">&#91;</span>user<span style="color: #7a0874; font-weight: bold;">&#93;</span>
<span style="color: #c20cb9; font-weight: bold;">passwd</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span>user<span style="color: #7a0874; font-weight: bold;">&#93;</span>
usermod <span style="color: #660033;">-G</span> wheel <span style="color: #7a0874; font-weight: bold;">&#91;</span>user<span style="color: #7a0874; font-weight: bold;">&#93;</span></pre></td></tr></table></div>

<h3>SSHポート番号変更</h3>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">vim</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>ssh<span style="color: #000000; font-weight: bold;">/</span>sshd_config</pre></td></tr></table></div>

<pre>
#Port 22
Port [new port]
</pre>
<h3>公開認証鍵に</h3>
<p>鍵を作成し転送</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">ssh-keygen</span> <span style="color: #660033;">-t</span> rsa <span style="color: #660033;">-C</span> <span style="color: #ff0000;">&quot;[email]&quot;</span>
<span style="color: #c20cb9; font-weight: bold;">scp</span> ~<span style="color: #000000; font-weight: bold;">/</span>.ssh<span style="color: #000000; font-weight: bold;">/</span>id_rsa.pub <span style="color: #7a0874; font-weight: bold;">&#91;</span>user<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #000000; font-weight: bold;">@</span><span style="color: #7a0874; font-weight: bold;">&#91;</span>host<span style="color: #7a0874; font-weight: bold;">&#93;</span>:<span style="color: #000000; font-weight: bold;">/</span>home<span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#91;</span>user<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #000000; font-weight: bold;">/</span>authorized_keys</pre></td></tr></table></div>

<p>公開鍵の設定</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #007800;">$HOME</span>
<span style="color: #c20cb9; font-weight: bold;">mkdir</span> .ssh
<span style="color: #c20cb9; font-weight: bold;">chmod</span> <span style="color: #000000;">700</span> .ssh
<span style="color: #c20cb9; font-weight: bold;">chmod</span> <span style="color: #000000;">600</span> authorized_keys
<span style="color: #c20cb9; font-weight: bold;">mv</span> authorized_keys .ssh<span style="color: #000000; font-weight: bold;">/</span>authorized_keys</pre></td></tr></table></div>

<p>設定を変更し反映</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">vim</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>ssh<span style="color: #000000; font-weight: bold;">/</span>sshd_config</pre></td></tr></table></div>

<pre>
PermitRootLogin no
PasswordAuthentication no
</pre>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>sshd restart</pre></td></tr></table></div>

<p>　</p>
<h2>node.jsの導入</h2>
<p><a href="https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager">Installing Node.js via package manager</a>を参考に。</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">wget</span> http:<span style="color: #000000; font-weight: bold;">//</span>nodejs.tchol.org<span style="color: #000000; font-weight: bold;">/</span>repocfg<span style="color: #000000; font-weight: bold;">/</span>el<span style="color: #000000; font-weight: bold;">/</span>nodejs-stable-release.noarch.rpm
<span style="color: #c20cb9; font-weight: bold;">yum localinstall</span> <span style="color: #660033;">--nogpgcheck</span> nodejs-stable-release.noarch.rpm
<span style="color: #c20cb9; font-weight: bold;">yum install</span> nodejs-compat-symlinks npm
<span style="color: #c20cb9; font-weight: bold;">rm</span> nodejs-stable-release.noarch.rpm</pre></td></tr></table></div>

<p>2012/8/9時点ではnode v0.6.18が入りました。</p>
<p>　</p>
<h2>動作テスト</h2>
<p>適当なフォルダに移動し、</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">git init</span>
<span style="color: #c20cb9; font-weight: bold;">git clone</span> git:<span style="color: #000000; font-weight: bold;">//</span>github.com<span style="color: #000000; font-weight: bold;">/</span>tyage<span style="color: #000000; font-weight: bold;">/</span>nekomeshi.git
<span style="color: #7a0874; font-weight: bold;">cd</span> nekomeshi
npm <span style="color: #c20cb9; font-weight: bold;">install</span>
node app.js</pre></td></tr></table></div>

<p>これで動作テストは完了です。</p>
