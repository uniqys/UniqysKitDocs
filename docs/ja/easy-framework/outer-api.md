---
title: Outer API
---

# Outer API

Easy Frameworkには、外部からアカウント情報やトランザクションの状態を確認できるREST APIがあります。

設定ファイルの[uniqys.json](/ja/uniqys-cli/config-file.md#uniqys-json)で指定した`innerApi`のアドレスに対してリクエストを送ることで、接続することができます。
また、`gateway`のアドレスに対してパスのルートに`/uniqys`を付加したアドレスに送信すれば、外部からアクセスが可能です。（例：`GET https://example.com/uniqys/awaiting/{id}`）

Easy Clientを利用する場合は、[EasyClient.api](#)のメソッドを利用してアクセスすることも可能です。

## `GET /awaiting/{id}`

送信済みのトランザクションのステータスを返す

#### Path Parameter

| キー | タイプ | 説明 |
| --- | --- | --- |
| `id` | string | トランザクションのID |

#### Response

- 既にブロックチェーンに取り込まれている場合は[トランザクションのレスポンス](#)
- 未だブロックチェーンに取り込まれていない場合は、ステータス202

## `GET /accounts/{address}`

アドレスのトークン残高、ノンス（トランザクションの識別子）を取得する

#### Path Parameter

| キー | タイプ | 説明 |
| --- | --- | --- |
| `address` | string | アドレス |

#### Response Body

```json
{
  "nonce": 21,
  "balance": 1520
}
```
