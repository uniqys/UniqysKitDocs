---
title: Chain Core
---

# Chain Core

Chain Core is a component in Uniqys Network that is in charge of generating and managing blockchain.
It uses [libp2p](https://github.com/libp2p) to build a P2P network and shares a sole blockchain in the network.

## Consensus Algorithm

Chain Core uses PBFT based consensus algorithm used in [Tendermint](https://tendermint.com/static/docs/tendermint.pdf).
Tendermint consensus algorithm enables an application to be securely and consistently replicated on multiple machines, realizing decentralized management of blockchain data, or in other words, application state.

PoW (Proof of Work), a consensus algorithm used in Bitcoin and Ethereum, is highly decentralized, but cannot shorten the block creation interval, so the transaction approval time is long.
In addition, it has no finality, so users had to wait for several blocks to make sure that the transaction execution is done with stochastically enough guarantee.
Therefore, while PoW is compatible with applications requiring highly decentralized control such as asset management, there are parts that are not suitable for many applications such as games.
For that reason, Uniqys has adopted the Tendermint algorithm to benefit from finality and high throughput.
