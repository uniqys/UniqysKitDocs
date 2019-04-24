---
title: Event Provider
---

# Event Provider

Event Providerは、イベントトランザクションを発行します。
イベントトランザクションは一般的なトランザクションと違い、特定のブロックに**必ず**取り込まれなければいけないトランザクションになります。
ですから、バリデータはブロックを検証する際に、必要なイベントトランザクションが含まれていなければブロックを承認しません。

## Two-way Pegging

Event Providerを導入することで、Uniqys KitではTwo-way Peggingを実現できます。
Two-way Peggingとは、2つ以上のブロックチェーン間をトークン移動できる仕組みです。
例えば、Ethereumで発行されたトークンをUniqys Kitのチェーンと入出金することを考えます。
Ethereumのコントラクトは、関数実行するとEventを発行する機能がありますが、そのEventをUniqys Kitのイベントトランザクションとし、その内容にコンセンサスを取ることができます。
アプリケーションはChain Core経由でイベントを受け取り、それに基づいたトークンの移動等を行うことができます。
反対に、Uniqys KitからEthereumにトークンを戻す際は、出金トランザクションが実行されたことを証明するデータをEthereumに提出することで、Ethereumで出金処理を実行できます。
Event Providerによりトークンの移動に自由度が増し、多種多様な設計のDAppsが作れるようになります。
