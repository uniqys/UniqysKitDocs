---
title: Easy Framework
---

# Easy Framework

Easy FrameworkはUniqys Kitの主要コンポーネントのひとつです。
Easy Frameworkを用いることで、デベロッパはブロックチェーンを意識することなく、従来のウェブアプリの技術を用いて開発することができます。

## 仕組み

Easy Frameworkはアプリケーション、クライアント、Chain Coreのコネクションの仲介となり、リクエストの仕分けやブロックチェーン用のデータベースの提供、アカウント情報の処理を担います。

<img :src="$withBase('/uniqys-overview.png')" alt="niqys Overview">

### Gateway

Gatewayはクライアントからのリクエストを受け付けるプロキシのような役割をします。
Easy Frameworkでは、クライアントの送るリクエストをNormal Request、Signed Requestの二種類に分けていて、Gatewayはそれらを適切なシステムに転送します。

Normal Requestは、データベースを書き換えない`GET`リクエストを指します。
例えば、ウェブサイトのHTMLをフェッチするリクエストやデータを取得するリクエストなどです。
GatewayはNormal Requestを受け取ると、アプリケーションのHTTP Serverのプロキシとなり、リクエストをアプリケーションに直接転送します。
そしてそのレスポンスはGatewayを経由して、クライアントに送信されます。

Signed Requestは、ユーザが署名をしたリクエストを指し、主にデータベースの内容を書き換えるような`POST`や`PUT`などのリクエストです。
このタイプのリクエストは直接アプリケーションに送信されるのではなく、Chain Coreを経由してからアプリケーションに送信されます。
ですから、Signed Requestがアプリケーションに送信されるまでに、Chain Coreによってブロックチェーンに取り込まれるまでの時間がかかります。

### Memcached Protocol

Uniqys Kitを用いたDApps開発では、Easy Frameworkがデータベースを提供します。
そのデータベースを操作するMemcachedサーバが提供されるため、データベースへのアクセスをMemcachedクライアントを用いて行うことができます。
既存のMemcachedクライアントライブラリを用いることも可能です。

### Outer API / Inner API

Outer APIとInner APIはDApps内のアカウントのマネジメントをするためのAPIで、トランザクションのステータス確認、アカウント情報の確認・操作をする機能があります。

Outer APIはGatewayで提供していて、トランザクションのステータスやアカウントの情報を確認することができます。
Inner APIはOuter APIと同様の機能に加え、アカウントのトークン残高の操作をすることができます。
詳しい使い方は[こちら](/ja/easy-framework/api.md)で確認してください。
