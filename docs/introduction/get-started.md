---
title: Get Started
---

# Get Started

Using Easy Framework allows developers to build DApps like a conventional web application.
All you need to do is to implement REST API and web frontend.

In this guide, we will be creating a simple Python DApp that can get/set a message.

## Uniqys Kit

First, you need to create config files to launch development blockchain with one validator.

Run `dev-init` command with Uniqys CLI.

```bash
$ uniqys dev-init
```

You will see three JSON files.

```bash
$ ls
dapp.json uniqys.json validatorKey.json
```

## Server Side

We will start by building a server-side REST API.
This time we will be implementing with Python, so we will use [bottle](https://bottlepy.org) for the HTTP server, and [pymemcache](https://github.com/pinterest/pymemcache) for database management.

```bash
$ pip install bottle pymemcache
```

Implement REST API with simple get/set of a message. We will name this file `main.py`.

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
    message = db.get('message')
    if message is not None:
        decoded = message.decode('utf8')
        return {'message': decoded}
    response.status = 404

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

## Frontend

Now, we need to implement a frontend that can call the server side REST API.
By using Easy Client, you can implement API calls with [axios](https://github.com/axios/axios)-like interface.
Create `index.html` as below.

```html
<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <!-- This time we will be using CDN -->
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

## Run

The directory structure should be as follows with the work so far.

```bash
$ tree -L 1 .
.
├── dapp.json
├── index.html
├── main.py
├── uniqys.json
└── validatorKey.json
```

Specify the start command for DApp in `startApp` of `dapp.json`.

```diff
- "startApp": "echo \"no start command specified\""
+ "startApp": "python -u main.py"
```

Launch a validator node and the DApp with `start` command in Uniqys CLI.

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

Open [`http://localhost:8080/`](http://localhost:8080/) to see the DApp working.
