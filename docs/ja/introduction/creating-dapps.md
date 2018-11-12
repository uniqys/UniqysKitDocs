---
title: DAppsを作る
---

# DAppsを作る

## サーバーサイド

Uniqys Kitを用いたサーバーサイドの実装は、従来のREST APIの実装と似ています。
サーバーサイドのAPIを実装する言語は自由で、デベロッパが慣れた言語で開発することができます。
ここではPythonでの実装を例に、Easy Frameworkを用いて単純なDAppsを作ってみます。

### システム

Easy Frameworkは、外部からのすべてのリクエストを一度処理してから、DAppsへ送信します。
クライアントがEasy FrameworkのGatewayに対してリクエストを送信すると、リクエストのメソッドを基準に仕分けをします。
POST, PUT, 

### データベース

Uniqys KitでDAppsのサーバーサイド開発をする場合、データはEasy FrameworkのMemcached互換サーバを経由して保存・取得します。
Memcachedは本来揮発性データベースと呼ばれ、データはメモリに保存され、時間経過やOSの再起動で消去されてしまいますが、Easy FrameworkのMemcached互換サーバは永続的に保持します。
また、Memcachedのクライアントは今までにあったライブラリを用いることができます。

## クライアントサイド

TODO
