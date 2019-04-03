---
title: Installation
---

# Installation

## Node.js

You need Node.js v10.9.0 or later to install Uniqys Kit.
Using [nodenv](https://github.com/nodenv/nodenv) is recommended.

```bash
# After installing nodenv
$ nodenv install 10.9.0
$ nodenv global 10.9.0
```

::: warning
If you are using Node.js installed in the system in other programs, it may stop working.
Run below to restore the Node.js version.
```bash
$ nodenv global system
```
:::

## Uniqys CLI

Uniqys CLI is a command line interface to use Uniqys Kit.
It is distributed via npm and easy to install.

```bash
$ npm install -g @uniqys/cli
# or
$ yarn global add @uniqys/cli
```

You may check if it is correctly installed with below command.

```bash
$ uniqys -v
0.1.1
```
