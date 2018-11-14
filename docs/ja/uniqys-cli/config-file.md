---
title: 設定ファイル
---

# 設定ファイル

Uniqys Kitには、ノードを起動する際に必要な設定ファイルがいくつかあります。

それぞれの設定ファイルのデフォルト名はvalidatorKey.json, dapp.json, uniqys.jsonとなっていますが、設定やコマンドラインで自由に変更することができます。
このページでは、デフォルトのファイル名を用いて説明します。

## validatorKey.json

validatorKey.jsonはアドレスが記述されたファイルです。
Uniqys CLIの`gen-key`コマンドで生成することができます。

```sh
uniqys gen-key /path/to/validatorKey.json
```

`gen-key`コマンドを実行すると、以下のようなアドレスが記述されたファイルが生成されます。

```json
{
  "privateKey": "e6c02eba42dbad7139d7efdbd7d47756814038ac313f53a60bae36320aa1c631",
  "publicKey": "6d1b658cecb78dabc35cc9d53969f2937a2d1fca14d9407c4f0b945ff1df2439b0e19b94f079d00e3a57b54c35cee90cf120cbfa687080df534e7ee86e29febd",
  "address": "7491cc5cb29e3dd5329438a9c8cb5679ead1baa9"
}
```

設定の各キーは以下のような意味を持ちます。

| キー | 値の説明 |
| --- | --- |
| `privateKey` | アドレスの秘密鍵：公開せずに保持する |
| `publicKey` | アドレスの公開鍵：公開する必要はない |
| `address` | アドレス：トランザクションやステーキングに用いられ、公開される |

:::warning 注意
`gen-key`コマンドの実行時に出力パスを指定しない場合は、デフォルトでkey.jsonというファイル名になります。
:::

## dapp.json

dapp.jsonはブロックチェーンネットワーク固有の設定ファイルです。
genesisブロックの情報を含んでいるため、そのチェーンを維持するノードは全て同じ設定ファイルを参照しなければいけません。
ですから、dapp.jsonはDAppのソースコードとともに公開する必要があります。

一からブロックチェーンを生成する場合は、Uniqys CLIの`dapp-conf`コマンドで生成することができます。

```sh
uniqys dapp-conf /path/to/dapp.json
```

`dapp-conf`コマンドを実行すると、以下のような設定ファイルのひな形が生成されます。

```json
{
  "unique": "2b2fdfd42498f1020962deb060ab5566ee2e995fa8381b5399b17076d0970d4707b33f882150dcc4",
  "timestamp": 1541406622,
  "validatorSet": [],
  "initApp": "",
  "startApp": "echo \"no start command specified\""
}
```

dapp.jsonの各キーは以下のような意味を持ちます。

| キー | 値の説明 |
| --- | --- |
| `unique` | genesisブロックをユニークにするための文字列 |
| `timestamp` | genesisブロックに記述する秒単位のタイムスタンプ |
| `validatorSet` | genesisブロックのバリデータのセット |
| ┣ `address` | バリデータのアドレス |
| ┗ `power` | バリデータのステークパワー |
| `initApp` | `init`コマンドを実行したときに実行するコマンド<br>（プログラムを初期化するコマンドを記述） |
| `startApp` | `start`コマンドを実行したときに実行するコマンド<br>（DAppを起動するコマンドを記述） |

これらの値を埋めると、以下のような設定ファイルが完成します。

```json
{
  "unique": "A string to make my blockchain unique!",
  "timestamp": 1541406622,
  "validatorSet": [
    {
      "address": "7491cc5cb29e3dd5329438a9c8cb5679ead1baa9",
      "power": 1
    }
  ],
  "initApp": "npm install",
  "startApp": "npm start"
}
```

この設定ファイルを他のノードに公開することで、ネットワークは同じブロックチェーンを参照するようになります。

## uniqys.json

uniqys.jsonはノードの設定ファイルです。
Uniqys CLIの`init`コマンドを実行すると同時に生成されます。

```sh
uniqys init /path/to/dapp.json
```

`init`コマンドを実行すると、以下のような設定ファイルのひな形が生成されます。

```json
{
  "dapp": "dapp.json",
  "dataDir": ".data",
  "validatorKey": "",
  "easy": {
    "gateway": {
      "port": 8080,
      "host": "0.0.0.0"
    },
    "app": {
      "port": 5650,
      "host": "127.0.0.1"
    },
    "innerApi": {
      "port": 5651,
      "host": "127.0.0.1"
    },
    "innerMemcached": {
      "port": 5652,
      "host": "127.0.0.1"
    }
  },
  "network": {
    "port": 5665,
    "address": "0.0.0.0"
  }
}
```

uniqys.jsonの各キーは以下のような意味を持ちます。

| キー | 値の説明 |
| --- | --- |
| `dapp` | dapp.jsonのパス |
| `dataDir` | .dataのパス |
| `validatorKey` | このノードのアドレスとして用いるキーが記述されているkey.json |
| `easy` | Easy Frameworkのネットワーク設定 |
| ┣ `gateway` | Gatewayのネットワーク設定 |
| ┣ `app` | DAppのネットワーク設定 |
| ┣ `innerApi` | innerAPIのネットワーク設定 |
| ┗ `innerMemcached` | Memcachedサーバのネットワーク設定 |
| `network` | Chain CoreのP2Pに用いるネットワーク設定 |

## .data

.dataフォルダでは、DAppのブロックチェーンデータを保持します。

Uniqys CLIの`init`を実行すると生成されます。
データの中身を変更する必要はありません。
