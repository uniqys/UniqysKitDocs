---
title: Easy Client
---

# Easy Client

Easy Clientは、クライアント側でリクエストに署名をし、トランザクションとして送信するためのツールです。
[Axios](https://github.com/axios/axios)ベースに作られているので、トランザクションに署名する機能のついたHTTPクライアントといえます。

## インストール

Easy Clientはnpmで公開されています。`npm`コマンドまたは`yarn`コマンドを用いてインストールできます。

```bash
$ npm install @uniqys/easy-client
# or
$ yarn add @uniqys/easy-client
```

## API

### EasyClient

```js
const easy = new EasyClient(signer, config)
```

#### 引数

- **signer**: 署名に必要なオブジェクト。詳細は`easy-client`パッケージの`Signer`を参照してください。
- **config**: EasyClientで用いる`AxiosRequestConfig`。詳細は[Axios](https://github.com/axios/axios)を参照してください。

### EasyClient.\<request type\>

以下のリクエストに対応しています。

- `easy.request(config)`
- `easy.get(url[, config])`
- `easy.delete(url[, config])`
- `easy.head(url[, config])`
- `easy.options(url[, config])`
- `easy.post(url[, data[, config]])`
- `easy.put(url[, data[, config]])`
- `easy.patch(url[, data[, config]])`

#### 引数

- **url**: リクエストを送るURL。
- **data**: リクエストに含めるデータ。
- **config**: `AxiosRequestConfig`に`{ sign: <boolean> }`という設定項目を追加したオブジェクト。`sign = true`に設定すると、リクエストに署名をしてから送信します。

### EasyClient.api

Outer APIに接続するためのメソッドを利用できます。

- `easy.api.account(address)`
- `easy.api.nonce(address)`
- `easy.api.balance(address)`
- `easy.api.awaiting(id)`

Outer APIの仕様に関しては、[こちら](/ja/easy-framework/api.md#outer-api)を確認してください。

## EasyClientForBrowser

`EasyClientForBrowser`は開発時に用いる`EasyClient`です。`EasyClient`を継承しています。
`EasyClientForBrowser`では、トランザクションに署名をする際にアラートを発火させます。
アラートに対してAcceptすることで、リクエストに署名をしてから送信されます。

::: warning 注意
`@uniqys/easy-client`の`EasyClientForBrowser`を用いる場合は、ユーザのウォレットキーをブラウザのlocalStorageに保存しているので、安全ではありません。プロダクションでの利用は非推奨です。
また、現在公式のウォレットはありませんが、独自でウォレットを開発する場合は`EasyClient`を用いて開発する必要があります。
:::

```js
const easy = new EasyClientForBrowser(baseUrl)
```

#### 引数

- **baseUrl**: アプリケーションのベースのURL。

## EasyClientForWeb3
`EasyClientForWeb3`は[web3.js](https://github.com/ethereum/web3.js)と連携し、MetamaskやQuragéなどの既存のウォレットの利用を可能にした`EasyClient`です。
`EasyClient`を継承しています。

```js
const easy = new EasyClientForWeb3(web3.currentProvider, baseUrl)
```

#### 引数

- **baseUrl**: アプリケーションのベースのURL。

## CDN経由での利用
`easy.js`は、`Easy`というグローバルオブジェクトの中に[`EasyClientForBrowser`](#easyclientforbrowser)と[`EasyClientForWeb3`](#easyclientforweb3)のインスタンスをそれぞれ`Browser` と `Web3` という名前で生成します。

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@uniqys/easy-client/lib/easy.js"></script>
<script type="text/javascript">
const easyBrowser = new Easy.Browser(location.origin) // EasyClientForBrowser
const easyWeb3 = new Easy.Web3(web3.currentProvider, location.origin) // EasyClientForWeb3
...
</script>
```
