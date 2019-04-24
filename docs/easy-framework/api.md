---
title: Outer API / Inner API
---

# Outer API / Inner API

Easy Framework has a REST API that can check account information and transaction status, or modify token balances.

## Outer API

Outer API provides "read-only" functions to check account information and transaction status.
You can access to Outer API by sending requests to the path `/uniqys` from Gateway's root address (e.g. `GET https://example.com/uniqys/awaiting/{id}`).
When you are using Easy Client, you can use the methods of [EasyClient.api](/ja/easy-framework/easy-client.md#easyclient-api) to access Outer API.

### `GET /awaiting/{id}`

Returns the transaction's status.

#### Parameters

| Key | Type | Explanation |
| --- | --- | --- |
| `id` | string | ID of transaction |

#### Response

- If the transaction is already executed in the blockchain, returns response for the transaction
- Else, returns Status 202

### `GET /accounts/{address}`

Returns token balance and nonce (an identifier for transactions) for an address.

#### Parameters

| Key | Type | Explanation |
| --- | --- | --- |
| `address` | string | Target address |

#### Response Body

```json
{
  "nonce": 21,
  "balance": 1520
}
```

### `GET /height`

Returns the height of the best block.

#### Response Body

```json
[2]
```

### `GET /block/{height}`

Returns block information.

#### Parameters

| キー | タイプ | 説明 |
| --- | --- | --- |
| `height` | number or "latest" | Height of the block. Put "latest" for the best block. |

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

Returns transaction information.

#### Parameters

| キー | タイプ | 説明 |
| --- | --- | --- |
| `hash` | string | Hash of a transaction |

#### Response Body

Transaction data in binary format

```json
["00000000ac97ad52e87adc4e8cd20fb8ab41f6e922bcfba8f73f5fadce9d411e454b394b8b2a39cc38d9a5f2dd0be29b692c144865f863d8dda7ae6fba51fd5afd85c95e131b000000000000000100000004504f5354000000092f6d65737361676573000000010000000c636f6e74656e742d747970650000001e6170706c69636174696f6e2f6a736f6e3b636861727365743d7574662d38000000147b22636f6e74656e7473223a2248656c6c6f227d"]
```

### `GET /transaction/{hash}/proof`

Returns merkle proof for a transaction.

#### Parameters

| キー | タイプ | 説明 |
| --- | --- | --- |
| `hash` | string | Hash of a transaction |

#### Response Body

Array of hashes

```json
["7e2e62aa61e7c9dd06d71d90174fddb96969c931a1178c9b56dccd2696856cbd", ...]
```

## Inner API

Inner API provides "read/write" functions to modify and check account information.

You can access Inner API by sending requests to `innerApi`'s address, designated in [`uniqys.json`](/uniqys-cli/config-file.md#uniqys-json).
Functions in Outer API is provided in Inner API as well.

### `PUT /accounts/{address}/balance`

Modifies account token balance.

#### Parameters

| Key | Type | Explanation |
| --- | --- | --- |
| `address` | string | Target address |

#### Request Body

Modifying balance

```
300
```

#### Response Body

New balance

```
300
```

### `POST /accounts/{address}/transfer`

Send token from an address to other address.

#### Parameters

| Key | Type | Explanation |
| --- | --- | --- |
| `address` | string | Target address |

#### Request Body

Designate destination and amount in JSON format

```json
{
  "to": "7491cc5cb29e3dd5329438a9c8cb5679ead1baa9",
  "value": 300
}
```

#### Response Status

`200 OK`
