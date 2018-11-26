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

#### Path Parameter

| Key | Type | Explanation |
| --- | --- | --- |
| `id` | string | ID of transaction |

#### Response

- If the transaction is already executed in the blockchain, returns response for the transaction
- Else, returns Status 202

### `GET /accounts/{address}`

Returns token balance and nonce (an identifier for transactions) for an address.

#### Path Parameter

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

## Inner API

Inner API provides "read/write" functions to modify and check account information.

You can access Inner API by sending requests to `innerApi`'s address, designated in [`uniqys.json`](/uniqys-cli/config-file.md#uniqys-json).
Functions in Outer API is provided in Inner API as well.

### `PUT /accounts/{address}/balance`

Modifies account token balance.

#### Path Parameter

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

#### Path Parameter

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
