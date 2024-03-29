---
title: 僕とTitanium Developerの3日間戦争 – 導入まで
author: tyage
type: post
date: 2011-04-27T11:24:51+00:00
url: /archive/p335.html
has_been_twittered:
  - yes
categories:
  - 開発
tags:
  - Titanium

---
<p>とある事情でTitaniumを使ってAndroid/iPhoneアプリを作ることになったのですが、早速Titaniumに手こずってしまったので、記録をまとめてみました。</p>
<p>Titaniumの導入まで（この場合、KitchenSinkをAndroidエミュレータで動かすまで）に三日、作業時間だと約20時間もかかったのは、自分が情弱だったのが原因です。<br />
普通はこんなに時間がかかるはずがないです。（たぶん・・・）</p>
<h2>初めに</h2>
<p>環境はWindows XP SP3です。<br />
Macユーザーの方はもっと参考になるサイトがあるはずです。お疲れさまでした。</p>
<p>最終的に必要だったことは以下の通りです。</p>
<ul>
<li>
		ユーザ名（もしくはホームディレクトリ名）に日本語が含まれないことを確認<br />
		※もしユーザ名に日本語が含まれていれば、アルファベットのみのユーザ名で新しく作ることをお勧めします。
	</li>
<li><a href="http://java.sun.com/javase/ja/6/download.html">JDK6</a>のインストール</li>
<li>
		環境変数PATHにJDKを設定する。<br />
		例： 「C:Program FilesJavajdk1.6.0_24bin;」をPATHに追加<br />
		※JDKのバージョン等でパスは異なりますが、最後に「bin」を付けるのを忘れないでください
	</li>
<li><a href="http://developer.android.com/sdk/index.html">Android SDK</a>のインストール</li>
<li>
		環境変数PATHにAndroid SDKを設定する。<br />
		例：「C:Program FilesAndroidandroid-sdkplatform-tools;C:Program FilesAndroidandroid-sdktools;」を追加
	</li>
<li><a href="http://www.appcelerator.com/">Titanium Developer1.2.2</a>をインストール</li>
<li>一息ついて再起動する（必要ないかも？）</li>
<li>Titanium Developerを実行し、アカウント登録をする</li>
<li>Titanium Mobileをダウンロード</li>
<li>Android SDK Package ManagerでAPIパッケージをインストール</l>
<li>
		android-sdktoolsにあるadb.exeをandroid-sdkplatform-toolsにコピーする<br />
		例：「copy &#8220;C:Program FilesAndroidandroid-sdkplatform-toolsadb.exe&#8221; &#8220;C:Program FilesAndroidandroid-sdktools&#8221;」<br />
		※TitaniumがAndroid SDKのバージョンアップに追いついていないため必要
	</li>
<li>Titanium DeveloperにAndroid SDKのパスを設定する</li>
<li>
		<a href="https://github.com/appcelerator/KitchenSink">KitchenSink1.6.1</a>をダウンロード<br />
		※KitchenSinkディレクトリまでのパスが長くならない場所に置いてください。
	</li>
<li>Titanium DeveloperからKitchenSinkをインポートしてプロジェクトを作成する</li>
<li>
		KitchenSinkプロジェクトを選択肢、Test &#038; PackageタブからLaunch<br />
		※SDKはAPIs 2.2かAPIs 2.3がいいらしい。<br />
		※上手くいかない場合も何度かめげずにLaunchするといいらしい。
	</li>
<li>長いイライラタイムを過ぎるとKitchenSinkが動く！！</li>
<li>お疲れさまでした。</li>
</ul>
<p><!--more--></p>
<h2>参考にしたサイト</h2>
<p>ありがとうございましたへ（_ _）へ</p>
<p><a href="http://d.hatena.ne.jp/Cherenkov/20110112/p1">何がなんでもTitanium MobileでKitchenSinkを起動したい人の覚書（Windows） &#8211; Cherenkovの暗中模索にっき</a><br />
<a href="http://developer.appcelerator.com/question/21091/error-error-locating-jdk-set-javahome-or-put-javac-and-jarsigner-on-your-path">Appcelerator Developer Center &#8211; ERROR] Error locating JDK: set $JAVA_HOME or put javac and jarsigner on your $PATH</a><br />
<a href="http://d.hatena.ne.jp/jitsu102/20110101/1293867164">Titaniumで作るAndroidアプリ開発(Titaniumインストール～サンプルアプリ&quot;Kitchen Sink&quot;起動) &#8211; jitsu102の日記</a><br />
<a href="http://builds.appcelerator.com.s3.amazonaws.com/index.html">builds.appcelerator.com.s3.amazonaws.com/index.html</a><br />
<a href="http://a-h.parfe.jp/einfach/archives/2011/0106224213.html">TitaniumのコードをGUIなしでエディタからすばやくbuildする on Ruby &#8211; AUSGANG SOFT</a><br />
<a href="http://d.hatena.ne.jp/r_kurain/20101015/1287122259">Titaniumビルド手順まとめ &#8211; kurainの壺</a><br />
<a href="http://d.hatena.ne.jp/jitsu102/20110101/1293867164">Titaniumで作るAndroidアプリ開発(Titaniumインストール～サンプルアプリ&quot;Kitchen Sink&quot;起動) &#8211; jitsu102の日記</a><br />
<a href="http://blog.makotokw.com/2011/03/10/windows%E3%81%A7%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0%E3%82%92%E3%81%84%E3%81%98%E3%82%89%E3%81%AA%E3%81%84%E3%81%A7titanium-mobile%E3%82%92%E4%BD%BF%E3%81%86/">Windowsで環境変数をいじらないでTitanium mobileを使う « kwLog</a><br />
<a href="http://ziddy.japan.zdnet.com/qa5265779.html">教えて！Ziddyちゃん &#8211; Android emulator が起動できません</a></p>
<h2>Twitterログ</h2>
<p>発狂が見れます。</p>
<p><a href="http://twilog.org/tyage/date-110424/">中井喜一(@tyage)/2011年04月24日 &#8211; Twilog</a><br />
<a href="http://twilog.org/tyage/date-110425/">中井喜一(@tyage)/2011年04月25日 &#8211; Twilog</a><br />
<a href="http://twilog.org/tyage/date-110426/">中井喜一(@tyage)/2011年04月26日 &#8211; Twilog</a></p>
<h2>一日目（4/24）</h2>
<p>00:30<br />
　こばラジ終了後に作業を開始<br />
　Web+DB Press vol.61のTitaniumコラムを開く<br />
01:00<br />
　歯を磨きながら、Titanium DeveloperとAndroid SDKをインストール<br />
　愛用しているnotepad++のTitanium Pluginをインストール<br />
02:30<br />
　親に背後で睨まれながら、インストール終了を確認して就寝<br />
12:00<br />
　起床<br />
13:00<br />
　爽快セキュリティ勉強会ustを見る<br />
　ust見つつTitaniumの続きをする<br />
　Android SDKの設定ができないと悩む<br />
15:00<br />
　<a href="http://d.hatena.ne.jp/jitsu102/20110101/1293867164">Titaniumで作るAndroidアプリ開発(Titaniumインストール～サンプルアプリ&quot;Kitchen Sink&quot;起動) &#8211; jitsu102の日記</a>を見る<br />
　abd.exeをコピーする<br />
　Android SDKの設定ができる<br />
　しかしLaunchしたところエラー発生<br />
15:30<br />
　<a href="http://developer.appcelerator.com/question/21091/error-error-locating-jdk-set-javahome-or-put-javac-and-jarsigner-on-your-path">Appcelerator Developer Center &#8211; ERROR] Error locating JDK: set $JAVA_HOME or put javac and jarsigner on your $PATH</a>を見る<br />
　環境変数PATHを設定する<br />
　（※この設定では不十分です！真似しないでください）<br />
　ユーザー変数「JAVA_HOME」と「android_sdk」を設定した後、PATHに「;%JAVA_HOME%bin;%android_sdk%」を追加<br />
　しかしエラーは消えない<br />
16:30<br />
　builder.pyを編集し、環境変数PATHをbuilder.pyから参照しても更新されていないことを確認<br />
　おもむろに再起動する<br />
17:00<br />
　<a href="http://d.hatena.ne.jp/Cherenkov/20110112/p1">何がなんでもTitanium MobileでKitchenSinkを起動したい人の覚書（Windows） &#8211; Cherenkovの暗中模索にっき</a>を見る<br />
　KitchenSinkディレクトリへのパスが長すぎると駄目だと分かり、ディレクトリをD:以下に移動する<br />
　しかしエミュレータは起動しない<br />
17:30<br />
　Web+DB Pressに「めげずに何回かLanchを押してみてください」とあるので連打<br />
　めげる<br />
　#titaniumJPで質問→スルーされる<br />
　”Building KitchenSink for Android &#8230; one moment”　で止まる<br />
21:30<br />
　<a href="http://blog.makotokw.com/2011/03/10/windows%E3%81%A7%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0%E3%82%92%E3%81%84%E3%81%98%E3%82%89%E3%81%AA%E3%81%84%E3%81%A7titanium-mobile%E3%82%92%E4%BD%BF%E3%81%86/">Windowsで環境変数をいじらないでTitanium mobileを使う « kwLog</a>を見る<br />
　pythonとSConsをインストールする（※必要なかった）<br />
　しかし動かない<br />
23:30<br />
　<a href="http://ascii.jp/elem/000/000/434/434443/">ASCII.jp：端末は無くとも、Androidのエミュレーターは動かせる！｜Android日本上陸！ Androidのすべてを知る</a>を見る<br />
　Androidエミュレータ自体が動かないことに気づく</p>
<h2>二日目（4/25）</h2>
<p>00:00<br />
　<a href="http://ziddy.japan.zdnet.com/qa5265779.html">教えて！Ziddyちゃん &#8211; Android emulator が起動できません</a>を見る<br />
　ディレクトリ名（この場合ホームディレクトリ）に日本語が含まれるとエラーになると知る<br />
01:00<br />
　「ホームディレクトリ/.android/」フォルダにあるファイルを編集し、日本語を含まないディレクトリを参照するようにする<br />
　もちろん参照先に必要なファイルをコピーする<br />
　（※この方法だと、新しい種類のエミュレータを作る毎にファイルを編集しなければなりません。）<br />
　（※そのため、名前に日本語が含まれないユーザを作成することをお勧めします。）<br />
　エミュレータがついに動く<br />
01:30<br />
　エミュレータが動いたものの、KitchenSinkが未だ出現しない<br />
　不安を覚えながらも就寝<br />
22:30<br />
　学校・塾を終わらせて帰宅<br />
　セプキャン2011の会場が大阪だと聞いて少し興奮する<br />
23:00<br />
　Twitterで教えてもらうなどして、KitchenSinkのビルドができていないことを知る<br />
23:30<br />
　Titaniumのクラウドが不安定だと知り、Titaniumサーバーのせいにする</p>
<h2>三日目（4/26）</h2>
<p>00:00<br />
　ビルドフォルダは作られていることを知り混乱する<br />
2:00<br />
　いろいろやるけど諦めて寝る<br />
15:30<br />
　体育祭予行が終わり、疲れて就寝<br />
19:30<br />
　起床<br />
22:00<br />
　調べまわった末、コマンドラインからビルドする<br />
　PATHを通したつもりがjavacコマンドが実行できないことに気づく<br />
　「%JAVA_HOME%bin」でPATHを設定したのが問題だと気づき、ユーザ変数を使わずにPATHを設定する<br />
　例：「C:Program FilesJavajdk&#8230;.bin;」に変更<br />
　（ついでにAndroid SDKへのパスも同様に変更）<br />
22:30<br />
　KitchenSinkが動く<br />
　歓喜<br />
　<br />
安らかに就寝</p>
<p>いやはや疲れました。<br />
しかし本当の勝負はこれからなんですね。おお怖い</p>
