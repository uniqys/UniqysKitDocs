---
title: Get Started
---

# Get Started

Uniqys Kitの[Easy Framework](/ja/easy-framework/easy-framework.md)を使用することで、デベロッパは普通のWeb開発と同じくREST APIとWebフロントエンドを実装するだけでDApp開発ができます。

今回はPythonでメッセージをGet/SetできるDAppを作ってみましょう。

## Uniqys Kit

前の章でインストールしたUniqys CLIの`dev-init`サブコマンドを用いて、バリデータが1人の開発用のノードのconfigを生成します。

```bash
$ uniqys dev-init
```

3つのjsonファイルが生成されます。

```bash
$ ls
dapp.json uniqys.json validatorKey.json
```

## サーバサイド

サーバサイドに必要なライブラリをインストールします。今回はPythonで実装するので、HTTPサーバには[bottle](https://bottlepy.org)を、ブロックチェーンのストアの操作には[pymemcache](https://github.com/pinterest/pymemcache)を使用します。

```bash
$ pip install bottle pymemcache
```

messageをSet/Getするだけの簡単なREST APIを実装します。

```python
import json
from bottle import route, run, request, static_file
from pymemcache.client import Client

DB_HOST = 'localhost'
DB_PORT = 5652
APP_HOST = 'localhost'
APP_PORT = 5650

db = Client((DB_HOST, DB_PORT))

@route('/message')
def get_message():
    message = db.get('message').decode('utf8')
    return {'message': message}

@route('/message', method='POST')
def post_message():
    sender = request.get_header('uniqys-sender')
    body = request.json
    message = body['message']
    db.set('message', message.encode('utf8'))

@route('/')
def index():
    return static_file('index.html', root='.')

run(host=APP_HOST, port=APP_PORT)
```

## フロントエンド

実装したAPIをフロントエンドから呼び出します。Uniqys KitのEasy Clientを使用することで[axios](https://github.com/axios/axios)に似たインターフェースで実装が可能です。

```html
<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.jsdelivr.net/npm/@uniqys/easy-client/lib/easy.js"></script>
  <script>
    var client = new Easy.Browser('http://localhost:8080');

    function update() {
      var e = document.querySelector('#message');
      client.get('/message').then(function(res) {
        var message = res.data.message;
        e.innerText = "message: " + message;
      });
    }

    function submit() {
      var e = document.querySelector('body > input[type="text"]');
      var value = e.value;

      client.post('/message', { message: value }, { sign: true }).then(function() {
        update();
      })
    }
  </script>
</head>
<body onload="update()">
  <input type="text" name="message">
  <button onClick="submit()">submit</button>
  <div id="message"></div>
</body>
</html>
```

## 起動

これまでの作業でディレクトリ構成は以下の通りになっているはずです。

```bash
$ tree -L 1 .
.
├── dapp.json
├── index.html
├── main.py
├── uniqys.json
└── validatorKey.json
```

`dapp.json`の`startApp`にDAppの起動コマンドを指定します。

```diff
- "startApp": "echo \"no start command specified\""
+ "startApp": "python -u main.py"
```

Uniqys CLIの`start`サブコマンドでブロックチェーンノードとDAppを立ち上げます。

```bash
$ uniqys start
  p2p:network add protocol uniqys/v1 +0ms
  easy-fw listen gateway: 0.0.0.0:8080 +0ms
  easy-fw listen inner API: 127.0.0.1:5651 +0ms
  easy-fw listen inner Memcached: 127.0.0.1:5652 +0ms
Bottle v0.12.13 server starting up (using WSGIRefServer())...
Listening on http://localhost:5650/
Hit Ctrl-C to quit.
# ...
  chain-core:consensus see valid block bb4e5a5101cf456615aa791a48e1491b347985f02cfd1758a7b9f50d07c4ad4c +0ms
  chain-core:consensus +2/3 prevote for block +0ms
  chain-core:consensus precommit: (2, 1) bb4e5a5101cf456615aa791a48e1491b347985f02cfd1758a7b9f50d07c4ad4c +1ms
  chain-core:consensus +2/3 precommit for block +0ms
  chain-core:consensus commit block(2): bb4e5a5101cf456615aa791a48e1491b347985f02cfd1758a7b9f50d07c4ad4c +0ms
  chain-core:executor execute transaction in block(2) +6ms
  chain-core:sync chain block(2) from local +6ms
  chain-core:sync propagate block (2) +0ms
  chain-core:consensus new height 3 with app state c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470 +2ms
```

ブラウザで[`http://localhost:8080/`](http://localhost:8080/)を開けば動いているDAppを確認できます。
