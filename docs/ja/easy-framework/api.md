---
title: Outer API / Inner API
---

# Outer API / Inner API

Easy Frameworkには、アカウント情報やトランザクションの状態を確認・操作できるREST APIがあります。

## Outer API

Outer APIはアカウント情報やトランザクションの状態を確認できるAPIです。
`gateway`のアドレスのルートに`/uniqys`を付加したアドレスに送信すれば、外部からアクセスが可能です。（例：`GET https://example.com/uniqys/awaiting/{id}`）
Easy Clientを利用する場合は、[EasyClient.api](/ja/easy-framework/easy-client.md#easyclient-api)のメソッドを利用してアクセスすることも可能です。

### `GET /awaiting/{id}`

送信済みトランザクションのステータスを返します。

#### Parameters

| キー | タイプ | 説明 |
| --- | --- | --- |
| `id` | string | トランザクションのID |

#### Response

- 既にブロックチェーンに取り込まれている場合はトランザクションに対するレスポンス
- 未だブロックチェーンに取り込まれていない場合は、ステータス202

### `GET /accounts/{address}`

アドレスのトークン残高、ノンス（トランザクションの識別子）を返します。

#### Parameters

| キー | タイプ | 説明 |
| --- | --- | --- |
| `address` | string | 対象のアドレス |

#### Response Body

```json
{
  "nonce": 21,
  "balance": 1520
}
```

### `GET /height`

最新ブロックの高さを取得します。

#### Response Body

```json
[2]
```

### `GET /block/{height}`

Uniqysのブロック情報を取得します。

#### Parameters

| キー | タイプ | 説明 |
| --- | --- | --- |
| `height` | number or "latest" | 情報を取得したいブロックの高さ。"latest"とすると最新のブロックを取得 |

#### Response Body

```json
{
  "header": {
    "height": 2,
    "timestamp": 1556068377,
    "lastBlockHash": "8bdf497a3207830ce6f7dd3a77e691083647a9ba9c9ad92494e6f868bb1b01f7",
    "transactionRoot": "c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
    "lastBlockConsensusRoot": "8fdb6a39bf379514172d5bf5c3033c2f2856390ae6b33e9da0490d91db587737",
    "nextValidatorSetRoot": "7a3de9d8155409a8268c43423d49d82cde9246930efe1a8ca1c623f156d601f2",
    "appStateHash": "c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"
  },
  "body": {
    "transactions": [...], // binary data of transactions
    "consensus": {
      "height": 2,
      "round": 1,
      "blockHash": "bc114565f33e9f6dcc1444cc37a2f52de539087102cf67532c534ddcab95fbbd",
      "signatures": [...]  // signatures of validators
    }
  },
  "hash":"bc114565f33e9f6dcc1444cc37a2f52de539087102cf67532c534ddcab95fbbd"
}
```

### `GET /transaction/{hash}`

トランザクションの情報を取得します。

#### Parameters

| キー | タイプ | 説明 |
| --- | --- | --- |
| `hash` | string | トランザクションのハッシュ |

#### Response Body

バイナリ形式のトランザクションデータ

```json
["00000000ac97ad52e87adc4e8cd20fb8ab41f6e922bcfba8f73f5fadce9d411e454b394b8b2a39cc38d9a5f2dd0be29b692c144865f863d8dda7ae6fba51fd5afd85c95e131b000000000000000100000004504f5354000000092f6d65737361676573000000010000000c636f6e74656e742d747970650000001e6170706c69636174696f6e2f6a736f6e3b636861727365743d7574662d38000000147b22636f6e74656e7473223a2248656c6c6f227d"]
```

### `GET /transaction/{hash}/proof`

トランザクションのマークルプルーフを取得します。

#### Parameters

| キー | タイプ | 説明 |
| --- | --- | --- |
| `hash` | string | トランザクションのハッシュ |

#### Response Body

マークルプルーフの配列

```json
["7e2e62aa61e7c9dd06d71d90174fddb96969c931a1178c9b56dccd2696856cbd", ...]
```

## Inner API

Inner APIは、アカウント情報を操作できる非公開のAPIです。

設定ファイルの[uniqys.json](/ja/uniqys-cli/config-file.md#uniqys-json)で指定した`innerApi`のアドレスに対してリクエストを送ることで、利用することができます。
また、Outer APIで提供しているAPIも利用することができます。

### `PUT /accounts/{address}/balance`

アドレスの残高を変更します。

#### Parameters

| キー | タイプ | 説明 |
| --- | --- | --- |
| `address` | string | 対象のアドレス |

#### Request Body

変更する値

```
300
```

#### Response Body

新しい残高

```
[300]
```

### `POST /accounts/{address}/transfer`

アドレスからアドレスへ送金します。

#### Parameters

| キー | タイプ | 説明 |
| --- | --- | --- |
| `address` | string | 対象のアドレス |

#### Request Body

JSON形式で送金先と値を指定

```json
{
  "to": "7491cc5cb29e3dd5329438a9c8cb5679ead1baa9",
  "value": 300
}
```

#### Response Status

`200 OK`
