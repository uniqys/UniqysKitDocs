---
title: Config File
---

# Config File

There are several config files necessary for launching a node with Uniqys Kit.

Default file name for each config files are `validatorKey.json`, `dapp.json`, and `uniqys.json`, but you may change the file name freely.
In this page, we will explain using the default file name.

## validatorKey.json

`validatorKey.json` is a config file that has a set of keys and an address written.
You can use `gen-key` command in Uniqys CLI to generate `validatorKey.json`.

```bash
uniqys gen-key /path/to/validatorKey.json
```

After running `gen-key` command, you will see a JSON file generated that looks like this:

```json
{
  "privateKey": "e6c02eba42dbad7139d7efdbd7d47756814038ac313f53a60bae36320aa1c631",
  "publicKey": "6d1b658cecb78dabc35cc9d53969f2937a2d1fca14d9407c4f0b945ff1df2439b0e19b94f079d00e3a57b54c35cee90cf120cbfa687080df534e7ee86e29febd",
  "address": "7491cc5cb29e3dd5329438a9c8cb5679ead1baa9"
}
```

Description of each key is as follows.

| Key | Explanation |
| --- | --- |
| `privateKey` | Private key of an address: must keep it secret |
| `publicKey` | Public key of an address: does not need to be in public |
| `address` | Address: used in transactions and staking, and will be in public |

:::warning
When you run `gen-key` command without designating output path, the default file name will be `key.json`.
:::

## dapp.json

`dapp.json` is a unique config file for **each blockchain network**.
It has information of the genesis block, so every validator node in the same network must reference the same `dapp.json`.
Therefore, `dapp.json` must be attached to the opened source code of the DApp.

If you are building a blockchain from scratch, run `dapp-conf` command in Uniqys CLI to generate `dapp.json`.

```bash
uniqys dapp-conf /path/to/dapp.json
```

After running `dapp-conf` command, you will see a JSON file generated that looks like this:

```json
{
  "unique": "2b2fdfd42498f1020962deb060ab5566ee2e995fa8381b5399b17076d0970d4707b33f882150dcc4",
  "timestamp": 1541406622,
  "validatorSet": [],
  "initApp": "",
  "startApp": "echo \"no start command specified\""
}
```

Description of each key is as follows.

| Key | Explanation |
| --- | --- |
| `unique` | String to make genesis block unique |
| `timestamp` | Timestamp of genesis block in seconds |
| `validatorSet` | Validator set of genesis block |
| ┣ `address` | Validator's address |
| ┗ `power` | Validator's voting power |
| `initApp` | Command that runs with the `uniqys init` command<br>(A command for initializing the DApp) |
| `startApp` | Command that runs with the `uniqys start` command<br>(A command for starting the DApp) |

After filling in the settings, `dapp.json` will look like this:

```json
{
  "unique": "A string to make my blockchain unique!",
  "timestamp": 1541406622,
  "validatorSet": [
    {
      "address": "7491cc5cb29e3dd5329438a9c8cb5679ead1baa9",
      "power": 1
    }
  ],
  "initApp": "npm install",
  "startApp": "npm start"
}
```

You must open this file to other nodes, in order that they can reference the same blockchain.

## uniqys.json

`uniqys.json` is a config file for **your validator node**.
It will be generated with the `init` command in Uniqys CLI.

```bash
uniqys init /path/to/dapp.json
```

After running `init` command, you will see a JSON file generated that looks like this:

```json
{
  "dapp": "dapp.json",
  "dataDir": ".data",
  "validatorKey": "",
  "easy": {
    "gateway": {
      "port": 8080,
      "host": "0.0.0.0"
    },
    "app": {
      "port": 5650,
      "host": "127.0.0.1"
    },
    "innerApi": {
      "port": 5651,
      "host": "127.0.0.1"
    },
    "innerMemcached": {
      "port": 5652,
      "host": "127.0.0.1"
    }
  },
  "network": {
    "port": 5665,
    "address": "0.0.0.0"
  }
}
```

Description of each key is as follows.

| Key | Explanation |
| --- | --- |
| `dapp` | Path to `dapp.json` |
| `dataDir` | Path to `.data` directory |
| `validatorKey` | Path to `validatorKey.json` to use as a validator key |
| `easy` | Network config for Easy Framework |
| ┣ `gateway` | Network config for Gateway |
| ┣ `app` | Network config for DApp |
| ┣ `innerApi` | Network config for InnerAPI |
| ┗ `innerMemcached` | Network config for Memcached server |
| `network` | Network config for P2P network in Chain Core |

## .data

`.data` directory stores blockchain data.

`.data` will be generated with the `init` command in Uniqys CLI. 
You do not need to modify the data inside.
