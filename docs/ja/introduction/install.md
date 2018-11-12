---
title: インストール
---

# インストール

## Node.js

Uniqys Kitをインストールするには、Node.js v10.9.0以降が必要です。
[ndenv](https://github.com/riywo/ndenv)を用いると簡単にインストールできます。

```sh
# ndenvをインストールした後に実行
ndenv install v10.9.0
ndenv global v10.9.0
```

::: warning 注意
他のプログラムでシステムにインストールされたNode.jsを利用している場合は、動作しなくなる可能性があります。
Node.jsのバージョンを戻すには以下を実行してください。
```sh
ndenv global system
```
:::

## Uniqys CLI

Uniqys CLIはUniqys Kitを使うためのコマンドライン・インターフェースです。
npmで公開されていて、簡単にインストールすることができます。

```sh
npm install -g @uniqys/cli
```

以下のコマンドでインストールされたことを確認できます。

```sh
$ uniqys -v
0.0.4
```
