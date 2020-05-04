---
title: 嘘つきPHP ZipArchive::addGlobと壊れたファイルパス
author: tyage
type: posts
date: 2016-12-05T12:24:31+00:00
url: /?p=944
wp-syntax-cache-content:
  - |
    a:5:{i:1;s:3618:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="php" style="font-family:monospace;"><span style="color: #000088;">$dir</span> <span style="color: #339933;">=</span> <span style="color: #0000ff;">'/tmp/workdir/'</span><span style="color: #339933;">;</span>
    &nbsp;
    <span style="color: #666666; font-style: italic;">// create jsons/api.json</span>
    <span style="color: #000088;">$jsonDir</span> <span style="color: #339933;">=</span> <span style="color: #000088;">$dir</span> <span style="color: #339933;">.</span> <span style="color: #0000ff;">'jsons'</span><span style="color: #339933;">;</span>
    <span style="color: #990000;">mkdir</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$jsonDir</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #990000;">file_put_contents</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$jsonDir</span><span style="color: #339933;">.</span> <span style="color: #0000ff;">'api.json'</span><span style="color: #339933;">,</span> <span style="color: #990000;">json_encode</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$request</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    &nbsp;
    <span style="color: #666666; font-style: italic;">// create archive.zip</span>
    <span style="color: #000088;">$zip</span> <span style="color: #339933;">=</span> <span style="color: #000000; font-weight: bold;">new</span> ZipArchive<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #000088;">$zip</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">open</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$dir</span> <span style="color: #339933;">.</span> <span style="color: #0000ff;">'archive.zip'</span><span style="color: #339933;">,</span> ZipArchive<span style="color: #339933;">::</span><span style="color: #004000;">CREATE</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #000088;">$zip</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">addGlob</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$dir</span> <span style="color: #339933;">.</span> <span style="color: #0000ff;">'**/**'</span><span style="color: #339933;">,</span> <span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span> <span style="color: #009900;">&#91;</span><span style="color: #0000ff;">'remove_path'</span> <span style="color: #339933;">=&gt;</span> <span style="color: #000088;">$dir</span><span style="color: #009900;">&#93;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #000088;">$zip</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">close</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre></td></tr></table><p class="theCode" style="display:none;">$dir = '/tmp/workdir/';
    
    // create jsons/api.json
    $jsonDir = $dir . 'jsons';
    mkdir($jsonDir);
    file_put_contents($jsonDir. 'api.json', json_encode($request));
    
    // create archive.zip
    $zip = new ZipArchive();
    $zip-&gt;open($dir . 'archive.zip', ZipArchive::CREATE);
    $zip-&gt;addGlob($dir . '**/**', 0, ['remove_path' =&gt; $dir]);
    $zip-&gt;close();</p></div>
    ";i:2;s:1180:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="php" style="font-family:monospace;"><span style="color: #000088;">$zip</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">addGlob</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$dir</span> <span style="color: #339933;">.</span> <span style="color: #0000ff;">'**/**'</span><span style="color: #339933;">,</span> <span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span> <span style="color: #009900;">&#91;</span><span style="color: #0000ff;">'add_path'</span> <span style="color: #339933;">=&gt;</span> <span style="color: #0000ff;">'prefix/'</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">'remove_path'</span> <span style="color: #339933;">=&gt;</span> <span style="color: #000088;">$dir</span><span style="color: #009900;">&#93;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre></td></tr></table><p class="theCode" style="display:none;">$zip-&gt;addGlob($dir . '**/**', 0, ['add_path' =&gt; 'prefix/', 'remove_path' =&gt; $dir]);</p></div>
    ";i:3;s:4734:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="line_numbers"><pre>1
    2
    3
    4
    5
    6
    7
    8
    9
    10
    11
    12
    </pre></td><td class="code"><pre class="php" style="font-family:monospace;"><span style="color: #b1b100;">if</span> <span style="color: #009900;">&#40;</span><span style="color: #009900;">&#40;</span>zval_file <span style="color: #339933;">=</span> zend_hash_index_find<span style="color: #009900;">&#40;</span>Z_ARRVAL_P<span style="color: #009900;">&#40;</span>return_value<span style="color: #009900;">&#41;</span><span style="color: #339933;">,</span> i<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span> <span style="color: #339933;">!=</span> <span style="color: #009900; font-weight: bold;">NULL</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
    	<span style="color: #b1b100;">if</span> <span style="color: #009900;">&#40;</span>remove_all_path<span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
    		<span style="color: #990000;">basename</span> <span style="color: #339933;">=</span> php_basename<span style="color: #009900;">&#40;</span>Z_STRVAL_P<span style="color: #009900;">&#40;</span>zval_file<span style="color: #009900;">&#41;</span><span style="color: #339933;">,</span> Z_STRLEN_P<span style="color: #009900;">&#40;</span>zval_file<span style="color: #009900;">&#41;</span><span style="color: #339933;">,</span> <span style="color: #009900; font-weight: bold;">NULL</span><span style="color: #339933;">,</span> <span style="color: #cc66cc;">0</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    		file_stripped <span style="color: #339933;">=</span> ZSTR_VAL<span style="color: #009900;">&#40;</span><span style="color: #990000;">basename</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    		file_stripped_len <span style="color: #339933;">=</span> ZSTR_LEN<span style="color: #009900;">&#40;</span><span style="color: #990000;">basename</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    	<span style="color: #009900;">&#125;</span> <span style="color: #b1b100;">else</span> <span style="color: #b1b100;">if</span> <span style="color: #009900;">&#40;</span>remove_path <span style="color: #339933;">&amp;&amp;</span> <span style="color: #990000;">strstr</span><span style="color: #009900;">&#40;</span>Z_STRVAL_P<span style="color: #009900;">&#40;</span>zval_file<span style="color: #009900;">&#41;</span><span style="color: #339933;">,</span> remove_path<span style="color: #009900;">&#41;</span> <span style="color: #339933;">!=</span> <span style="color: #009900; font-weight: bold;">NULL</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
    		file_stripped <span style="color: #339933;">=</span> Z_STRVAL_P<span style="color: #009900;">&#40;</span>zval_file<span style="color: #009900;">&#41;</span> <span style="color: #339933;">+</span> remove_path_len <span style="color: #339933;">+</span> <span style="color: #cc66cc;">1</span><span style="color: #339933;">;</span>
    		file_stripped_len <span style="color: #339933;">=</span> Z_STRLEN_P<span style="color: #009900;">&#40;</span>zval_file<span style="color: #009900;">&#41;</span> <span style="color: #339933;">-</span> remove_path_len <span style="color: #339933;">-</span> <span style="color: #cc66cc;">1</span><span style="color: #339933;">;</span>
    	<span style="color: #009900;">&#125;</span> <span style="color: #b1b100;">else</span> <span style="color: #009900;">&#123;</span>
    		file_stripped <span style="color: #339933;">=</span> Z_STRVAL_P<span style="color: #009900;">&#40;</span>zval_file<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    		file_stripped_len <span style="color: #339933;">=</span> Z_STRLEN_P<span style="color: #009900;">&#40;</span>zval_file<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    	<span style="color: #009900;">&#125;</span></pre></td></tr></table><p class="theCode" style="display:none;">if ((zval_file = zend_hash_index_find(Z_ARRVAL_P(return_value), i)) != NULL) {
    	if (remove_all_path) {
    		basename = php_basename(Z_STRVAL_P(zval_file), Z_STRLEN_P(zval_file), NULL, 0);
    		file_stripped = ZSTR_VAL(basename);
    		file_stripped_len = ZSTR_LEN(basename);
    	} else if (remove_path &amp;&amp; strstr(Z_STRVAL_P(zval_file), remove_path) != NULL) {
    		file_stripped = Z_STRVAL_P(zval_file) + remove_path_len + 1;
    		file_stripped_len = Z_STRLEN_P(zval_file) - remove_path_len - 1;
    	} else {
    		file_stripped = Z_STRVAL_P(zval_file);
    		file_stripped_len = Z_STRLEN_P(zval_file);
    	}</p></div>
    ";i:4;s:2120:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="php" style="font-family:monospace;"><span style="color: #000088;">$dir</span> <span style="color: #339933;">=</span> <span style="color: #990000;">realpath</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$dirname</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #000088;">$options</span> <span style="color: #339933;">=</span> <span style="color: #990000;">array</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'add_path'</span> <span style="color: #339933;">=&gt;</span> <span style="color: #0000ff;">'baz/'</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">'remove_path'</span> <span style="color: #339933;">=&gt;</span> <span style="color: #000088;">$dir</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #b1b100;">if</span> <span style="color: #009900;">&#40;</span><span style="color: #339933;">!</span><span style="color: #000088;">$zip</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">addPattern</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'/\.txt$/'</span><span style="color: #339933;">,</span> <span style="color: #000088;">$dir</span><span style="color: #339933;">,</span> <span style="color: #000088;">$options</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
            <span style="color: #b1b100;">echo</span> <span style="color: #0000ff;">&quot;failed<span style="color: #000099; font-weight: bold;">\n</span>&quot;</span><span style="color: #339933;">;</span>
    <span style="color: #009900;">&#125;</span></pre></td></tr></table><p class="theCode" style="display:none;">$dir = realpath($dirname);
    $options = array('add_path' =&gt; 'baz/', 'remove_path' =&gt; $dir);
    if (!$zip-&gt;addPattern('/\.txt$/', $dir, $options)) {
            echo &quot;failed\n&quot;;
    }</p></div>
    ";i:5;s:3310:"
    <div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="php" style="font-family:monospace;"><span style="color: #000088;">$dir</span> <span style="color: #339933;">=</span> <span style="color: #0000ff;">'/tmp/workdir/'</span><span style="color: #339933;">;</span>
    <span style="color: #990000;">chdir</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$dir</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span> <span style="color: #666666; font-style: italic;">// change working dir!</span>
    &nbsp;
    <span style="color: #666666; font-style: italic;">// create jsons/api.json</span>
    <span style="color: #000088;">$jsonDir</span> <span style="color: #339933;">=</span> <span style="color: #0000ff;">'jsons'</span><span style="color: #339933;">;</span>
    <span style="color: #990000;">mkdir</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$jsonDir</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #990000;">file_put_contents</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$jsonDir</span><span style="color: #339933;">.</span> <span style="color: #0000ff;">'api.json'</span><span style="color: #339933;">,</span> <span style="color: #990000;">json_encode</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$request</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    &nbsp;
    <span style="color: #666666; font-style: italic;">// create archive.zip</span>
    <span style="color: #000088;">$zip</span> <span style="color: #339933;">=</span> <span style="color: #000000; font-weight: bold;">new</span> ZipArchive<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #000088;">$zip</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">open</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'archive.zip'</span><span style="color: #339933;">,</span> ZipArchive<span style="color: #339933;">::</span><span style="color: #004000;">CREATE</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #000088;">$zip</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">addGlob</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'**/**'</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #000088;">$zip</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">close</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre></td></tr></table><p class="theCode" style="display:none;">$dir = '/tmp/workdir/';
    chdir($dir); // change working dir!
    
    // create jsons/api.json
    $jsonDir = 'jsons';
    mkdir($jsonDir);
    file_put_contents($jsonDir. 'api.json', json_encode($request));
    
    // create archive.zip
    $zip = new ZipArchive();
    $zip-&gt;open('archive.zip', ZipArchive::CREATE);
    $zip-&gt;addGlob('**/**');
    $zip-&gt;close();</p></div>
    ";}
categories:
  - メモ

---
<p>こんにちは.<br />
KMC5回生のtyageです.</p>
<p>この記事は, <a href="http://www.adventar.org/calendars/1444">KMCアドベントカレンダー</a> 5日目の記事です.<br />
昨日はnonyleneさんの <a href="http://nonylene.hatenablog.jp/entry/2016/12/05/052817">Android Studio をビルドする</a> でした.</p>
<p>唐突ですが, 今日はPHPの話をします.</p>
<h2>TL;DR</h2>
<p>PHPのZipArchiveライブラリには, globパターンでファイルを追加する <code>addGlob</code> メソッドがある.<br />
これにはいくつかoptionが指定できるのだが, 挙動がおかしい.<br />
送った修正PRに反応をもらえたため, <a href="http://php.net/archive/2016.php#id2016-12-01-3">12/1にリリースされた PHP 7.1</a> に含まれないかなと期待していたが, 特に進展はなかった.<br />
みんな困ってないんか&#8230;?</p>
<h2>ZipArchive::addGlob</h2>
<p>PHPでオシゴトをしていると, PHPでZipファイルを作りたい瞬間があるのではないかと思います.<br />
私も, リクエスト内容が書かれたjsonファイルや画像をZipファイルでまとめてPOSTする超コズミックなAPIを叩く, 最高の機会がありました. (社会の歯車である一労働者は, 用意されたAPIに文句を言う前に黙々と作業をしなければいけない時があります.)<br />
また, 様々な都合でZip圧縮前のフォルダを残しておく必要があったため, こんなコードを書いたのです.</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="php" style="font-family:monospace;"><span style="color: #000088;">$dir</span> <span style="color: #339933;">=</span> <span style="color: #0000ff;">'/tmp/workdir/'</span><span style="color: #339933;">;</span>
&nbsp;
<span style="color: #666666; font-style: italic;">// create jsons/api.json</span>
<span style="color: #000088;">$jsonDir</span> <span style="color: #339933;">=</span> <span style="color: #000088;">$dir</span> <span style="color: #339933;">.</span> <span style="color: #0000ff;">'jsons'</span><span style="color: #339933;">;</span>
<span style="color: #990000;">mkdir</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$jsonDir</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #990000;">file_put_contents</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$jsonDir</span><span style="color: #339933;">.</span> <span style="color: #0000ff;">'api.json'</span><span style="color: #339933;">,</span> <span style="color: #990000;">json_encode</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$request</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
<span style="color: #666666; font-style: italic;">// create archive.zip</span>
<span style="color: #000088;">$zip</span> <span style="color: #339933;">=</span> <span style="color: #000000; font-weight: bold;">new</span> ZipArchive<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #000088;">$zip</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">open</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$dir</span> <span style="color: #339933;">.</span> <span style="color: #0000ff;">'archive.zip'</span><span style="color: #339933;">,</span> ZipArchive<span style="color: #339933;">::</span><span style="color: #004000;">CREATE</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #000088;">$zip</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">addGlob</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$dir</span> <span style="color: #339933;">.</span> <span style="color: #0000ff;">'**/**'</span><span style="color: #339933;">,</span> <span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span> <span style="color: #009900;">&#91;</span><span style="color: #0000ff;">'remove_path'</span> <span style="color: #339933;">=&gt;</span> <span style="color: #000088;">$dir</span><span style="color: #009900;">&#93;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #000088;">$zip</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">close</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre></td></tr></table></div>

<p><code>ZipArchive::addGlob</code>は, 第一引数にファイル検索パターンを, 第二引数に<a href="http://php.net/manual/ja/function.glob.php">globのフラグ</a>を, 第三引数にその他optionを指定します.<br />
このoptionが今回の焦点となるのですが, 以下の項目が設定できます.</p>
<blockquote>
<p>
      オプションの連想配列。次のオプションが使えます。
      </p>
<ul>
<li>
<p>
         <em>&#8220;add_path&#8221;</em>
        </p>
<p class="para">
         アーカイブ内のファイルのローカルパスに変換するときにつけるプレフィックス。<br />
         これが適用されるのは、<br />
         <em>&#8220;remove_path&#8221;</em> や <em>&#8220;remove_all_path&#8221;</em><br />
         で定義された削除処理がすべて終わった後です。
        </p>
</li>
<li>
<p>
         <em>&#8220;remove_path&#8221;</em>
        </p>
<p>
         マッチしたファイルをアーカイブに追加する前に削除するプレフィックス。
        </p>
</li>
<li>
<p>
         <em>&#8220;remove_all_path&#8221;</em>
        </p>
<p>
         <strong><code>TRUE</code></strong> にすると、ファイル名だけを使ってアーカイブのルートに追加します。
        </p>
</li>
</ul>
</blockquote>
<p>ref: <a href="http://php.net/manual/ja/ziparchive.addglob.php">http://php.net/manual/ja/ziparchive.addglob.php</a></p>
<p>ふむふむ.</p>
<p>今回は <code>remove_path</code> を指定しており, 期待していた挙動としては,</p>
<ol>
<li><code>archive.zip</code> というファイルができる</li>
<li>そこには <code>jsons/api.json</code> というファイルが含まれている</li>
</ol>
<p>です.</p>
<p>もし仮に, <code>remove_path</code> を指定していなければ <code>/tmp/workdir/jsons/api.json</code> というファイルが追加されるため, 正しくAPIを叩けなくなります.</p>
<p>で, 得られた結果がこれです.</p>
<pre>
/tmp/workdir ᐅ php -v
PHP 7.0.13 (cli) (built: Nov 15 2016 23:52:36) ( NTS )
Copyright (c) 1997-2016 The PHP Group
Zend Engine v3.0.0, Copyright (c) 1998-2016 Zend Technologies

/tmp/workdir ᐅ unzip -l archive.zip
Archive:  archive.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
        6  12-05-2016 18:04   /tmp/workdir/jsons/api.json
---------                     -------
        6                     1 file
</pre>
<p>あれ? <code>remove_path</code> optionを指定したのに <code>/tmp/workdir/jsons/api.json</code> のままですね&#8230;<br />
どういうことでしょう?</p>
<h2>問題1: add_path optionが必須</h2>
<p>調べてみると, どうも <code>add_path</code> optionが有効でないと他のoptionが機能しないバグがあるようです.</p>
<p><a href="https://bugs.php.net/bug.php?id=70103">issue</a> や <a href="https://github.com/php/php-src/pull/1430">PR</a> はあるものの, まだマージされていませんでした.</p>
<p>仕方ないので, とりあえず <code>add_path</code> optionをつけて試してみることにします.</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="php" style="font-family:monospace;"><span style="color: #000088;">$zip</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">addGlob</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$dir</span> <span style="color: #339933;">.</span> <span style="color: #0000ff;">'**/**'</span><span style="color: #339933;">,</span> <span style="color: #cc66cc;">0</span><span style="color: #339933;">,</span> <span style="color: #009900;">&#91;</span><span style="color: #0000ff;">'add_path'</span> <span style="color: #339933;">=&gt;</span> <span style="color: #0000ff;">'prefix/'</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">'remove_path'</span> <span style="color: #339933;">=&gt;</span> <span style="color: #000088;">$dir</span><span style="color: #009900;">&#93;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre></td></tr></table></div>

<p>さて, この場合どうなるでしょうか?<br />
<code>/tmp/workdir/jsons/api.json</code> から <code>/tmp/workdir/</code> を削って, <code>prefix/</code> を足すので <code>prefix/jsons/api.json</code> になりそうですね.<br />
さて, 結果はというと&#8230;</p>
<pre>
/tmp/workdir ᐅ unzip -l archive.zip
Archive:  archive.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
        6  12-05-2016 18:12   prefix/sons/api.json
---------                     -------
        6                     1 file
</pre>
<p>oh&#8230;<br />
jsons の j がどこかに消えて <code>prefix/sons/api.json</code> になってしまいました.</p>
<h2>問題2: 消えた j の謎</h2>
<p>これは霊障でしょうか?<br />
それとも宇宙線の影響でしょうか?</p>
<p>PHPソースコードを見ながら検証してみましょう.<br />
<code>addGlob</code> でファイルを追加する場合は <code>php_zip_add_from_pattern</code> という関数を見ればよさそうです. (<a href="https://github.com/php/php-src/blob/35cfec1f9ff14aefa98e8921306fede80c7ca26a/ext/zip/php_zip.c#L1618">ext/zip/php_zip.c#L1618</a>)</p>
<p>追加するファイルのファイルパスを操作しているのはここのようです.<br />
<code>remove_path_len</code> は <code>remove_path</code> optionの文字数, <code>zval_file</code> は恐らく検索して見つかったファイルのファイルパスを指しているのでしょう.</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="line_numbers"><pre>1
2
3
4
5
6
7
8
9
10
11
12
</pre></td><td class="code"><pre class="php" style="font-family:monospace;"><span style="color: #b1b100;">if</span> <span style="color: #009900;">&#40;</span><span style="color: #009900;">&#40;</span>zval_file <span style="color: #339933;">=</span> zend_hash_index_find<span style="color: #009900;">&#40;</span>Z_ARRVAL_P<span style="color: #009900;">&#40;</span>return_value<span style="color: #009900;">&#41;</span><span style="color: #339933;">,</span> i<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span> <span style="color: #339933;">!=</span> <span style="color: #009900; font-weight: bold;">NULL</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
	<span style="color: #b1b100;">if</span> <span style="color: #009900;">&#40;</span>remove_all_path<span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
		<span style="color: #990000;">basename</span> <span style="color: #339933;">=</span> php_basename<span style="color: #009900;">&#40;</span>Z_STRVAL_P<span style="color: #009900;">&#40;</span>zval_file<span style="color: #009900;">&#41;</span><span style="color: #339933;">,</span> Z_STRLEN_P<span style="color: #009900;">&#40;</span>zval_file<span style="color: #009900;">&#41;</span><span style="color: #339933;">,</span> <span style="color: #009900; font-weight: bold;">NULL</span><span style="color: #339933;">,</span> <span style="color: #cc66cc;">0</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
		file_stripped <span style="color: #339933;">=</span> ZSTR_VAL<span style="color: #009900;">&#40;</span><span style="color: #990000;">basename</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
		file_stripped_len <span style="color: #339933;">=</span> ZSTR_LEN<span style="color: #009900;">&#40;</span><span style="color: #990000;">basename</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	<span style="color: #009900;">&#125;</span> <span style="color: #b1b100;">else</span> <span style="color: #b1b100;">if</span> <span style="color: #009900;">&#40;</span>remove_path <span style="color: #339933;">&amp;&amp;</span> <span style="color: #990000;">strstr</span><span style="color: #009900;">&#40;</span>Z_STRVAL_P<span style="color: #009900;">&#40;</span>zval_file<span style="color: #009900;">&#41;</span><span style="color: #339933;">,</span> remove_path<span style="color: #009900;">&#41;</span> <span style="color: #339933;">!=</span> <span style="color: #009900; font-weight: bold;">NULL</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
		file_stripped <span style="color: #339933;">=</span> Z_STRVAL_P<span style="color: #009900;">&#40;</span>zval_file<span style="color: #009900;">&#41;</span> <span style="color: #339933;">+</span> remove_path_len <span style="color: #339933;">+</span> <span style="color: #cc66cc;">1</span><span style="color: #339933;">;</span>
		file_stripped_len <span style="color: #339933;">=</span> Z_STRLEN_P<span style="color: #009900;">&#40;</span>zval_file<span style="color: #009900;">&#41;</span> <span style="color: #339933;">-</span> remove_path_len <span style="color: #339933;">-</span> <span style="color: #cc66cc;">1</span><span style="color: #339933;">;</span>
	<span style="color: #009900;">&#125;</span> <span style="color: #b1b100;">else</span> <span style="color: #009900;">&#123;</span>
		file_stripped <span style="color: #339933;">=</span> Z_STRVAL_P<span style="color: #009900;">&#40;</span>zval_file<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
		file_stripped_len <span style="color: #339933;">=</span> Z_STRLEN_P<span style="color: #009900;">&#40;</span>zval_file<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	<span style="color: #009900;">&#125;</span></pre></td></tr></table></div>

<p>7行目を読んでみると, <code>remove_path</code> を指定した場合, ファイルパス指すポインタの指すアドレスが <code>remove_path_len + 1</code> 分進みます.<br />
上の例であれば <code>/tmp/workdir/j</code> の文字数分進みます.</p>
<p>どうやらこれが原因みたいですね.<br />
なんで + 1 されているのかさっぱりわからないのですが, まだバグ報告すらされていないようなので, とりあえずissueを立ててPRを送りましょう.</p>
<p><a href="https://bugs.php.net/bug.php?id=72374">Bug #72374 ZipArchive::addGlob remove_path option strips first char of filename</a><br />
<a href="https://github.com/php/php-src/pull/1939">Fix #72374: ZipArchive::addGlob remove_path option strips first char of filename #1939</a></p>
<p>2週間くらいで返事がもらえ, bugfixとして認識してもらえたようです.<br />
ただ, Breaking ChangeなのでPHP7.1.0かPHP8にマージされそうです.(などと言っているうちに7.1.0がリリースされたのですが&#8230;)</p>
<p>PRを出してから半年が経過し, このままだと忘れ去られそうなのでここに記録することにしました.<br />
早くマージされるといいなぁ.</p>
<h2>既存のテストは?</h2>
<p>ところで, <code>remove_path</code> optionに対するテストがなかったかというと, 実はありました.<br />
<a href="https://github.com/tyage/php-src/blob/35cfec1f9ff14aefa98e8921306fede80c7ca26a/ext/zip/tests/oo_addpattern.phpt">ext/zip/tests/oo_addpattern.phpt</a></p>
<p>こんなコードでテストしています.</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="php" style="font-family:monospace;"><span style="color: #000088;">$dir</span> <span style="color: #339933;">=</span> <span style="color: #990000;">realpath</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$dirname</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #000088;">$options</span> <span style="color: #339933;">=</span> <span style="color: #990000;">array</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'add_path'</span> <span style="color: #339933;">=&gt;</span> <span style="color: #0000ff;">'baz/'</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">'remove_path'</span> <span style="color: #339933;">=&gt;</span> <span style="color: #000088;">$dir</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #b1b100;">if</span> <span style="color: #009900;">&#40;</span><span style="color: #339933;">!</span><span style="color: #000088;">$zip</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">addPattern</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'/\.txt$/'</span><span style="color: #339933;">,</span> <span style="color: #000088;">$dir</span><span style="color: #339933;">,</span> <span style="color: #000088;">$options</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
        <span style="color: #b1b100;">echo</span> <span style="color: #0000ff;">&quot;failed<span style="color: #000099; font-weight: bold;">\n</span>&quot;</span><span style="color: #339933;">;</span>
<span style="color: #009900;">&#125;</span></pre></td></tr></table></div>

<p>ここで, <code>$dirname = "/tmp/workdir/";</code> であれば, <code>$dir == "/tmp/workdir"</code> になります.<br />
ということは <code>/tmp/workdir/hoge.txt</code> から <code>/tmp/workdir</code> を削って <code>baz/</code> を先頭に足すoptionになるわけですが, 上記のバグから <code>baz//hoge.txt</code> ではなく <code>baz/hoge.txt</code> が生成されます.<br />
おめでたいテストですね.<br />
これも修正対象です.</p>
<h2>終わりに</h2>
<p>問題の原因は見つかり解決策も出したのですが, まだマージされていません.<br />
自前ビルドのPHPを運用するのも厳しいです.<br />
結局, working directoryを移動して, <code>remove_path</code> optionを利用しない方向で解決しました.</p>

<div class="wp_syntax" style="position:relative;"><table><tr><td class="code"><pre class="php" style="font-family:monospace;"><span style="color: #000088;">$dir</span> <span style="color: #339933;">=</span> <span style="color: #0000ff;">'/tmp/workdir/'</span><span style="color: #339933;">;</span>
<span style="color: #990000;">chdir</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$dir</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span> <span style="color: #666666; font-style: italic;">// change working dir!</span>
&nbsp;
<span style="color: #666666; font-style: italic;">// create jsons/api.json</span>
<span style="color: #000088;">$jsonDir</span> <span style="color: #339933;">=</span> <span style="color: #0000ff;">'jsons'</span><span style="color: #339933;">;</span>
<span style="color: #990000;">mkdir</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$jsonDir</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #990000;">file_put_contents</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$jsonDir</span><span style="color: #339933;">.</span> <span style="color: #0000ff;">'api.json'</span><span style="color: #339933;">,</span> <span style="color: #990000;">json_encode</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$request</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
<span style="color: #666666; font-style: italic;">// create archive.zip</span>
<span style="color: #000088;">$zip</span> <span style="color: #339933;">=</span> <span style="color: #000000; font-weight: bold;">new</span> ZipArchive<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #000088;">$zip</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">open</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'archive.zip'</span><span style="color: #339933;">,</span> ZipArchive<span style="color: #339933;">::</span><span style="color: #004000;">CREATE</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #000088;">$zip</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">addGlob</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">'**/**'</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #000088;">$zip</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">close</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre></td></tr></table></div>

<p>もし同じ問題を抱えている人がいれば, この記事が救いになりますように&#8230;</p>
<p>明日は dnek_ さんの「1年間の進捗」です.</p>
