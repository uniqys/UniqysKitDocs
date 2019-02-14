---
title: Easy Client
---

# Easy Client

Easy Client is a client-side tool to sign a request and send it as a transaction.
It is based on [Axios](https://github.com/axios/axios), so you may think Easy Client as an HTTP client with signing function.

## Installation

Easy Client is distributed via npm.

```bash
$ npm install @uniqys/easy-client
# or
$ yarn add @uniqys/easy-client
```

In path `node_modules/@uniqys/easy-client/lib/easy.js` there is a pre-bundled Easy Client, so you may cast it from the server to use in the client side.
`easy.js` exports [`EasyClientForBrowser`](#easyclientforbrowser) with the name `Easy`.

```html
<script type="text/javascript" src="/path/to/easy.js"></script>
<script type="text/javascript">
const easy = new Easy.Browser(location.origin) // EasyClientForBrowser
...
</script>
```

## API

### EasyClient

Most users do not need to use this class.
Use [`EasyClientForBrowser`](#easyclientforbrowser) for general DApps development.

```
const easy = EasyClient(signer, config)
```

#### Argument

- **signer**: A object necessary for signing. Please refer to `Signer` in `easy-client` package for more details.
- **config**: A instance of `AxiosRequestConfig`. Please refer to [Axios](https://github.com/axios/axios) for more details.

### EasyClient.\<request type\>

Below request methods are supported.

- `easy.request(config)`
- `easy.get(url[, config])`
- `easy.delete(url[, config])`
- `easy.head(url[, config])`
- `easy.options(url[, config])`
- `easy.post(url[, data[, config]])`
- `easy.put(url[, data[, config]])`
- `easy.patch(url[, data[, config]])`

#### Argument

- **url**: URL to send the request.
- **data**: Data to include in the request.
- **config**: `AxiosRequestConfig` with addition of config item `{ sign: <boolean> }`. When you set `sign = true`, the request will be signed before sent.

### EasyClient.api

Methods to access the Outer API.

- `easy.api.account(address)`
- `easy.api.nonce(address)`
- `easy.api.balance(address)`
- `easy.api.awaiting(id)`

For details of Outer API, please check [here](/easy-framework/api.md#outer-api).

### EasyClientForBrowser

`EasyClientForBrowser` is an extended class of `EasyClient`, designed to use during development.
`EasyClientForBrowser` shows alert when user signs a transaction.
By accepting to the alert, the request will be sent with a signature of the user.

::: warning
Using `EasyClientForBrowser` is not safe since it uses browser's localStorage to save users' wallet key.
We do not recommend using it in the product.
An official wallet is not released yet, but when you are developing your own wallet, you should use the `EasyClient` class.
:::

```
const easy = EasyClientForBrowser(baseUrl)
```

#### Argument

- **baseUrl**: Base URL for the application.
