---
title: Event Provider
---

# Event Provider

Event Provider is a module that creates event transactions.
Unlike normal transactions, proposers must include the event transactions to a designated block, or the block cannot be consented.

## Two-way Pegging

Event Provider enables building a two-way peg.
Two-way peg is a system in which assets can be transferred between two blockchains.
For example, let's consider transferring tokens issued in Ethereum to Uniqys.
Ethereum can issue Events when the users run a contract function.
Event Provider receives those Events and convert it into an event transaction, and send it to the application.
Finally, the application can transfer tokens according to the Event provided by Ethereum.
On the contrary, when users want to send tokens back to Ethereum, users can submit a proof of withdrawal to Ethereum to execute the withdraw function in Ethereum.
