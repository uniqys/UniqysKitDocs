---
title: Uniqys CLI
---

# Uniqys CLI

Uniqys CLIは、Uniqys Kitでブロックチェーンを作成、またはノードを立てるときに使うコマンドライン・インターフェースです。
詳細な説明は[Uniqys CLIをインストール](/ja/introduction/install-uniqys-kit.md)した後、`uniqys --help`で確認してください。
また、各種設定ファイルの詳細は[こちら](/ja/uniqys-cli/config-file.md)に記述しています。

## ノードの起動

まず、新たなブロックチェーンを生成する場合は、dapp.jsonを生成する必要があります。

```
uniqys dapp-conf /path/to/dapp.json
```

既にあるブロックチェーンのネットワークに参加する場合は、公開されたdapp.jsonを利用してください。

次に、DAppを初期化します。

```
uniqys init /path/to/dapp.json
```

DAppを初期化したときに、uniqys.jsonという設定ファイルが出力されます。
ポート番号やノードのアドレスなど、細かく設定する必要がある場合はuniqys.jsonの中身を変更してください。

最後に、起動します。

```
uniqys start
```

この後、ノードはネットワークに接続し、既にブロックチェーンが存在する場合は同期が開始します。
