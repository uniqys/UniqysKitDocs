---
title: Inner API
---

# Inner API

Easy Frameworkには、内部でアカウント情報を操作できるREST APIがあります。

設定ファイルの[uniqys.json](/ja/uniqys-cli/config-file.md#uniqys-json)で指定した`innerApi`のアドレスに対してリクエストを送ることで、接続することができます。
Inner APIはクライアント側から操作できないメソッドを含んでいるので、ポートを外部に開放してはいけません。

## `PUT /accounts/{address}/balance`

アドレスの残高を変更する

#### Path Parameter

| キー | タイプ | 説明 |
| --- | --- | --- |
| `address` | string | アドレス |

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

## `POST /accounts/{address}/transfer`

アドレスからアドレスへ送金する

#### Path Parameter

| キー | タイプ | 説明 |
| --- | --- | --- |
| `address` | string | アドレス |

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
