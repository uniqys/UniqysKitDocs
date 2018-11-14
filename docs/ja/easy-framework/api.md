---
title: Outer API / Inner API
---

# Outer API / Inner API

Easy Frameworkには、アカウント情報やトランザクションの状態を確認・操作できるREST APIがあります。

## Outer API

Outer APIはアカウント情報やトランザクションの状態を確認できるAPIです。
`gateway`のアドレスのルートに`/uniqys`を付加したアドレスに送信すれば、外部からアクセスが可能です。（例：`GET https://example.com/uniqys/awaiting/{id}`）
Easy Clientを利用する場合は、[EasyClient.api](#)のメソッドを利用してアクセスすることも可能です。

### `GET /awaiting/{id}`

送信済みトランザクションのステータスを返します。

#### Path Parameter

| キー | タイプ | 説明 |
| --- | --- | --- |
| `id` | string | トランザクションのID |

#### Response

- 既にブロックチェーンに取り込まれている場合はトランザクションに対するレスポンス
- 未だブロックチェーンに取り込まれていない場合は、ステータス202

### `GET /accounts/{address}`

アドレスのトークン残高、ノンス（トランザクションの識別子）を返します。

#### Path Parameter

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

## Inner API

Inner APIは、アカウント情報を操作できる非公開のAPIです。

設定ファイルの[uniqys.json](/ja/uniqys-cli/config-file.md#uniqys-json)で指定した`innerApi`のアドレスに対してリクエストを送ることで、利用することができます。
また、Outer APIで提供しているAPIも利用することができます。

### `PUT /accounts/{address}/balance`

アドレスの残高を変更します。

#### Path Parameter

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
300
```

### `POST /accounts/{address}/transfer`

アドレスからアドレスへ送金します。

#### Path Parameter

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
