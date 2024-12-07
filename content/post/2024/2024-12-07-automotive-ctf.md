---
title: "Automotive CTFの全xNexus問題のwriteup"
date: 2024-12-07T17:52:58+09:00
type: post
---

会社チーム「ierae」としてAutomotive CTF 2024に参加しました。
国内予選・国内決勝・国際決勝の3ステージがあったのですが、全てのステージでxNexusというVicOne社の提供するプラットフォームに関連する問題が出ました。

チームメンバーの他の問題のwriteup: [Automotive CTFのこと](https://amenable-muscari-82a.notion.site/Automotive-CTF-15554c2c788a80609e26cd9fb1686a46)

特段技術的に興味深い内容というわけではないのですが、自分しか解いていない問題もあるため供養します。

## xNexus Web RCE Anomaly - Automotive CTF 2024 Japan 予選

脅威分析プラットフォームであるxNexusのURLとアカウントが与えられるので、xNexusにログインしてどういった攻撃が飛んできたのかを調査するという問題です。
この問題に限らず、xNexusの問題は全て同じような形式です。

問題文
```
An RCE has been logged in xNexus, what was the exploit used? The answer should be enclosed in the proper flag format of this game.

https://...
```

ログインするとShellshockが検知されていることが表示されており、それがフラグでした。
この問題は他のメンバーが解いてくれました。

FLAG: `bh{shellshock}`

## xNexus CAN Bus Anomaly #1 - Automotive CTF 2024 Japan 予選

問題文
```
Analyze CAN Bus Data anomalies and find the pattern. Answer should be enclosed in the standard format flag.
```

記録されているCANのデータを眺めていると、ASCIIの文字がちょくちょく出てきます。

うんうん唸りながらその断片を組み合わせてエスパーしながら何度もsubmitすると以下が正解でした。

FLAG: `bh{4nom4lyfl4g}`

## xNexus CAN Bus Anomaly #2 - Automotive CTF 2024 Japan 予選

問題文
```
Someone is trying to disable the ESP and the power assisted system. Go track that anomaly with CAN ID 0x0645 and determine what car is being targeted for that kind of attack. The vehicle is the flag enclosed in the proper flag format.
```

次のようなデータが送信されており、ここからどの車種が攻撃されているかを特定する問題。

```
0x00000645 023e000000000000
0x00000645 0211010000000000
0x00000645 0210020000000000
```

これ自体には車両の情報がないので、検索能力が問われています。
しかも車両を答えろとはどういうフォーマットで答えればいいのか不明です。

色々調べていると、コンテストの運営の人が公開しているGitHubリポジトリを見つけました。
このリポジトリに色々なCAN Busに対する攻撃スクリプトが置かれています。

https://github.com/shipcod3/canTot

**以降、xNexus関連の問題に関しては全てこのリポジトリに答えがあります。**

この問題では以下のファイルに答えである`Tesla Model S P85`が書かれていました。

https://github.com/shipcod3/canTot/blob/5bdfa6c64feba377a1ea4011da4f83db13431875/modules/tesla_disable_esp_abs.py

FLAG: `bh{Tesla Model S P85}`

## xNexus CAN Bus Anomaly #1 - Automotive CTF 2024 Japan 決勝

Automotive CTF 2024 Japan 決勝の問題です。

問題文
```
<日本語> xNexusでCAN ID 0x3B9と0x3D1のCANバス異常を追跡して、その脆弱性IDを特定してください。ハッカーが通常参照するものを適切なフラグ形式で提出してください。
```

先ほどの問題と同じリポジトリで`0x3B9`を検索すると`CVE-2022-26269`が出てきました。

https://github.com/shipcod3/canTot/blob/5bdfa6c64feba377a1ea4011da4f83db13431875/modules/ignis_zeta_fuel_seatbelt_spoof.py

FLAG: `bh{CVE-2022-26269}`

## xNexus CAN Bus Anomaly #2 - Automotive CTF 2024 Japan 決勝

問題文
```
<日本語> おっと、誰かが車両の全シリンダーへの燃料供給を停止するCANフレームを送信しています。完全なCANフレームを提供してください。 フラグ形式の例：bh{1337#0201}
```

またもや例のリポジトリで`cylinder`を検索すれば答えが出てきます。

https://github.com/shipcod3/canTot/blob/5bdfa6c64feba377a1ea4011da4f83db13431875/modules/prius_park_killEngine.py

FLAG: bh{7e0#06301c000fa50100}

## xNexus CAN Bus Anomaly #1 - Automotive CTF 2024 Finals

アメリカ デトロイトで開催された決勝戦の問題です。
弊チームだけが解いた問題です。

問題文
```
Description: Don't DDoS me, Bro! Track the CAN Bus anomaly in xNexus that performs this attack and determine what kind of attack it is.
```

ログインすると`0000000000000000`というCAN Frameが見えたので、例のリポジトリを漁ります。
firehoseという攻撃名らしい。

https://github.com/shipcod3/canTot/blob/5bdfa6c64feba377a1ea4011da4f83db13431875/modules/kill_bus.py

FLAG: `bh{firehose}`

## xNexus CAN Bus Anomaly #2 - Automotive CTF 2024 Finals

問題文
```
Someone is trying to kill my engine. Determine what vehicle I am driving including the year by tracking CAN ID 0x7E0. Flag Format example: bh{Toyota Hilux 2021}
```

例のリポジトリで`0x7E0`を検索すれば答えが出てきます。

https://github.com/shipcod3/canTot/blob/5bdfa6c64feba377a1ea4011da4f83db13431875/modules/ford_escape_kill_engine.py

FLAG: `bh{Ford Escape 2010}`

終わり。

なんだったんだこのジャンル。
