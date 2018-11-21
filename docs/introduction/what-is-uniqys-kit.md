---
title: What is Uniqys Kit?
---

# What is Uniqys Kit?

Uniqys Kit is a blockchain platform, designed for developers to easily build and users to casually use decentralized application (DApps).

## Motivation

In a design where transactions of multiple DApps are handled in one blockchain, when a large number of transactions are issued at a certain DApp, the performance of the entire chain is degraded.
As a result, other DApps will have adverse effects such as delayed uptake of transactions.
With this, the barriers for new developers to build a new DApp is large, and our goal which is to "Make DApps closer to users" will be far away.
Uniqys Kit is one of the solutions to that problem.

Uniqys Kit has two main components: Chain Core and Easy Framework.
Chain Core provides a blockchain infrastructure that works as a sidechain.
Scalable and high-performance blockchain with a feature of modifiable transaction fee rule removes obstacles for building a DApp.
Easy Framework is a developers' toolkit to build a DApp with Chain Core, enabling developers to create DApps without being conscious of the blockchain.
With Easy Framework, creating DApps will be the same as building conventional web applications, and learning how to build a blockchain will be one less thing to worry about.

## Blockchain For DApps

Uniqys Kit targets strictly to be a useful toolkit for DApps developers, and the adopted technologies are due to consideration of DApps development.
The blockchain uses sidechain, a unique chain for every single DApp that can conserve security with connection to a major chain (e.g. Ethereum).
The consensus algorithm is PoS (Proof of Stake) with PBFT based algorithm which gives finality to the blockchain.
These two technologies were chosen because DApps engineers are able to achieve these benefits:

- Less transaction fee during DApps usage
- Short waiting time for transactions to be approved
- Secure blockchain with few validators

## HTTP Request as a Transaction

Easy Framework considers every HTTP requests that modify the application state as a transaction.
Easy Client, a client-side javascript package integrated into Easy Framework, enables users to sign the request and send it to the server.
Signed requests will be handled as an authenticated request in Easy Framework.
Therefore, all the interactions with blockchain are covered with Easy Framework, enabling DApps developers to minimize the learning cost for building a blockchain.
