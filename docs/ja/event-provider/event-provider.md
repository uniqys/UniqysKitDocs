---
title: Event Provider
---

# Event Provider

Event Providerは、イベントトランザクションを発行します。
イベントトランザクションは一般的なトランザクションと違い、特定のブロックに**必ず**取り込まれなければいけないトランザクションになります。
ですから、バリデータはブロックを検証する際に、必要なイベントトランザクションが含まれていなければブロックを承認しません。

## Event Providerが実装すべきメソッド
EventProviderは以下の2つのメソッドが実装されていることを想定しています。
これらのメソッドのインターフェースは `@uniqys/dapp-interface` で定義されています。

### `ready (): Promise<void>`
DAppの起動時に呼び出されるメソッドです。
`getTransaction` メソッドを呼び出すのに必要な準備を行うことを想定しています。

### `getTransactions (fromTimestamp: number, toTimestamp: number, nonce: number): Promise<Transaction[]>`
Event Providerが発行するトランザクションのリストを取得するメソッドです。
`fromTimestamp` から `toTimestamp` までの時間に発行されたトランザクションのリストを返すようにしてください。
`nonce` には現在のEventのnonceの次の値を指定します。

## dapp.jsonの設定
`dapp.json` に `eventProvider` を追加することで、DAppからEvent Providerを使用できます。

| キー | 値の説明 |
| --- | --- |
| `eventProvider` |  |
| ┣ `package` | EventProviderを実装したパッケージへのパス |
| ┗ `options` | EventProviderに応じて必要なパラメータ |

## Two-way Pegging

Event Providerを導入することで、Uniqys KitではTwo-way Peggingを実現できます。
Two-way Peggingとは、2つ以上のブロックチェーン間をトークン移動できる仕組みです。
例えば、Ethereumで発行されたトークンをUniqys Kitのチェーンと入出金することを考えます。
Ethereumのコントラクトは、関数実行するとEventを発行する機能がありますが、そのEventをUniqys Kitのイベントトランザクションとし、その内容にコンセンサスを取ることができます。
アプリケーションはChain Core経由でイベントを受け取り、それに基づいたトークンの移動等を行うことができます。
反対に、Uniqys KitからEthereumにトークンを戻す際は、出金トランザクションが実行されたことを証明するデータをEthereumに提出することで、Ethereumで出金処理を実行できます。
Event Providerによりトークンの移動に自由度が増し、多種多様な設計のDAppsが作れるようになります。

### Ethereum Sidechainの例
Uniqys Kitで提供されているサンプルアプリ"Ethereum Sidechain"のように、 `@uniqys/event-provider/ethereum` をEvent Providerとする場合にはdapp.jsonの `eventProvider/options` に以下の項目を指定します。

| キー | 値の説明 | デフォルト値 |
| --- | --- | --- |
| `options` |  |  |
| ┣ `providerEndPoint` | Event Providerのエンドポイント | http://localhost:7545 |
| ┣ `confirmationTime` | 承認時間 | 1500(msec) |
| ┗ `artifactPath` | デプロイされたコントラクトへのパス | `''` |
