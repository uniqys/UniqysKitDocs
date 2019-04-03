---
title: インストール
---

# インストール

## Node.js

Uniqys Kitをインストールするには、Node.js v10.9.0以降が必要です。
[nodenv](https://github.com/nodenv/nodenv)を用いると簡単にインストールできます。

```bash
# nodenvをインストールした後に実行
$ nodenv install 10.9.0
$ nodenv global 10.9.0
```

::: warning 注意
他のプログラムでシステムにインストールされたNode.jsを利用している場合は、動作しなくなる可能性があります。
Node.jsのバージョンを戻すには以下を実行してください。
```bash
$ nodenv global system
```
:::

## Uniqys CLI

Uniqys CLIはUniqys Kitを使うためのコマンドライン・インターフェースです。
npmで公開されていて、簡単にインストールすることができます。

```bash
$ npm install -g @uniqys/cli
# or
$ yarn global add @uniqys/cli
```

以下のコマンドでインストールされたことを確認できます。

```bash
$ uniqys -v
0.1.1
```
