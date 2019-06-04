---
title: Event Provider
---

# Event Provider

Event Provider is a module that creates event transactions.
Unlike normal transactions, proposers must include the event transactions to a designated block, or the block cannot be consented.

## Methods supposed to implement in Event Provider
It is assumed that the follow two methods are implemented in Event Provider.

### `ready (): Promise<void>`
This method is called when a DApp starts.
It is to prepare for calling `getTransaction` method.

### `getTransactions (fromTimestamp: number, toTimestamp: number, nonce: number): Promise<Transaction[]>`
This method gets a list of transactions issued by Event Provider.
It is assumed to return a list of transactions issued from `fromTimestamp` to `toTimestamp`.
The `nonce` is the next value of current nonce of Event.

## Setting of dapp.json
Event Provider is associated with DApp by adding `eventProvider` in dapp.json.

| Key | Explanation |
| --- | --- |
| `eventProvider` |  |
| ┣ `package` | Path to package of Event Provider |
| ┗ `options` | Parameters necessary for Event Provider |

## Two-way Pegging

Event Provider enables building a two-way peg.
Two-way peg is a system in which assets can be transferred between two blockchains.
For example, let's consider transferring tokens issued in Ethereum to Uniqys.
Ethereum can issue Events when the users run a contract function.
Event Provider receives those Events and convert it into an event transaction, and send it to the application.
Finally, the application can transfer tokens according to the Event provided by Ethereum.
On the contrary, when users want to send tokens back to Ethereum, users can submit a proof of withdrawal to Ethereum to execute the withdraw function in Ethereum.

### Example of Ethereum Sidechain
When you use `@uniqys/event-provider/ethereum` as Event Provider, like the sample application "Ethereum Sidechain" in Uniqys Kit, you need to set the following parameters.

| Key | Explanation | Default Value |
| --- | --- | --- |
| `options` |  |  |
| ┣ `providerEndPoint` | Endpoint of Event Provider | http://localhost:7545 |
| ┣ `confirmationTime` | Confirmation time | 1500(msec) |
| ┗ `artifactPath` | Path to deployed contract | `''` |
