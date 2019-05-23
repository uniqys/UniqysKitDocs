---
title: Uniqys CLI
---

# Uniqys CLI

Uniqys CLI is a command line interface for creating a blockchain or run a validator node.
Check `uniqys --help` for detailed usage.
For details of config files generated with Uniqys CLI, check [here](/uniqys-cli/config-file.md).

## Run a Validator Node

When you need to create a new blockchain, you must create `dapp.json`.

```
uniqys dapp-conf /path/to/dapp.json
```

If you are participating in a pre-existing blockchain network, use the distributed `dapp.json`.

Next, initialize the DApp.

```
uniqys init /path/to/dapp.json
```

`uniqys.json` will be created after initialization.
If you need to change the port number, validator address, etc., change values in `uniqys.json`.

Finally, start the node.

```
uniqys start
```

After this, the node will connect to the network, and sync blocks if a blockchain already exists.

## Dev Command

During development, you can use `dev-init` command for quick launch of a development node.

```bash
uniqys dev-init
```

After running the command, `uniqys.json`, `dapp.json`, `validatoKey.json` will be generated.
Then, you can launch a node with `uniqys start`.

When you need to delete the data of blockchain `.data`, use `init` command with `--reset` option.

```bash
$ uniqys init --reset
```