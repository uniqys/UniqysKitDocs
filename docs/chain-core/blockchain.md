---
title: Blockchain
---

# Blockchain

## Data Structure

Each block contains the following data.

- **height**: Height of the block
- **timestamp**: Timestamp of when the block was created
- **lastBlockHash**: Hash of the previous block
- **transactionRoot**: Merkle root of transactions
- **lastBlockConsensusRoot**: Merkle root of last block's consensus
- **nextValidatorSetRoot**: Merkle root of next validator set
- **appStateHash**: Hash of application state

## Relations Between Blocks

In Chain Core's blockchain, an arbitrary transaction is guaranteed after two blocks of which the transaction was included, due to the relations between consecutive blocks.

Here, we denote `Block(N)` for a block with height `N`.

### Transaction

#### Block(N)

The transaction included in this block will be sent to the application as a request, after approval of the block.

#### Block(N+1)

Transaction approved in `Block(N)` will be executed in the application before this block is approved, and its `appState` (application state) is included in this block.

### Consensus

#### Block(N)

Tne consensus of `Block(N)` is taken within this block's validator set.
When the signature of more than 2/3 of total voting power could be accumulated, the block will reach consensus.
However, this signatures will not be included in this `Block(N)`.
This is to include the set of signatures in a block which eventually will be taken consensus.
When there are signatures of more than 2/3 of voting power, it does become a proof of consensus even when the validator set is different.
However, by including the signature in the block, the network will be able to consent on the same validator set.

#### Block(N+1)

`Block(N+1)` has `lastBlockConsensus`, which is the set of signatures collected for `Block(N)`.
After the consensus for this `Block(N+1)` is taken, it is approved that the network has consented on an identical set of signatures for `Block(N)`.

:::tip
An arbitrary block is said to be final after the next block's `lastBlockConsensus` is included in the blockchain.
Therefore, the result for execution of transactions included in `Block(N-1)` will be included in `Block(N)` as `appState`, and the `appState` will be final at `Block(N+1)`.
:::

### Validator

#### Block(N)

`Block(N)` holds `Block(N+1)`'s validator set in `nextValidatorSet`.
This is to make validator set modifiable.

#### Block(N+1)

Signatures of nodes in `Block(N)`'s `nextValidatorSet` is used to reach consensus of `Block(N+1)`.
