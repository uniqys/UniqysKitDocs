---
title: What is Uniqys Kit?
---

# What is Uniqys Kit?

Uniqys Kit is a blockchain platform designed for developers to easily create, and users to casually use decentralized application (DApps).

In a design where transactions of multiple DApps are handled in one blockchain, when a large number of transactions are issued at a certain DApp, the performance of the entire chain is degraded.
Developers are able to build their own blockchain to avoid influence from other DApps, but the learning cost for building a blockchain and very high, and it is hard to maintain the security even when they built one.
As a result, there is a large barrier for new developers to create a new DApp, and our goal, to "Make DApps closer to users", will be far away.
Uniqys Kit is one of the solution for that problem.

Uniqys Kit has two main components: Chain Core and Easy Framework.
Chain Core provides a blockchain infrastructure that works as a sidechain.
Scalable and high-performance blockchain with a feature of modifiable transaction fee rule removes obstacles for building a DApp.
Easy Framework is a developers' toolkit to build a DApp with Chain Core, enabling developers to create DApps without being conscious of the blockchain.
With Easy Framework, creating DApps will be the same as building conventional web applications, and learning how to build a blockchain will be one less thing to worry about.

## Blockchain For DApps

Uniqys Kit aims to be a useful toolkit for DApps developers, and thereby the adopted technologies are due to consideration of DApps development.

Unlike Bitcoin and Ethereum, Uniqys Kit creates a unique blockchain for every single DApp to increase the transaction throughput.
However, it will be hard for developers to gather blockchain validators especially right after the DApps release.
Our approach to solving that problem is implementing a sidechain function: a link to a major chain to preserve the security.

The consensus algorithm is PoS (Proof of Stake) with PBFT based algorithm which gives finality to the blockchain.

These two technologies were chosen because DApps engineers are able to receive these benefits:

- Less transaction fee
- Short waiting time for transactions to be approved
- Secure blockchain with few validators

## HTTP Request as a Transaction

Easy Framework considers every HTTP request that modifies the database as a transaction.
Those transactions are signed with the Easy Client, a client-side javascript package integrated into Easy Framework.
Signed requests will be sent to the Easy Framework and handled as an authenticated request.

All the interactions with blockchain are covered with Easy Framework, and for that DApps developers are able to minimize the learning cost for building a blockchain.
