---
title: Easy Framework
---

# Easy Framework

Easy Framework is one of Uniqys Kit's main component.
With Easy Framework, developers are able to build a DApp like a conventional web application, even without being conscious of the blockchain.

## How it works

Easy Framework acts as an intermediary of client, application, and Chain Core, handling all the requests and distributes to the proper application.
Additionally, Easy Framework provides a database for blockchain and APIs for account management.

<img :src="$withBase('/uniqys-overview.png')" alt="Uniqys Overview">

### Gateway

Gateway works as a proxy for requests from clients.
In Easy Framework, Gateway classifies requests from clients to two types: Normal Request and Signed Request.

Normal Request indicates `GET` requests which do not modify the database.
For example, a simple request that fetches HTML from the website is a Normal Request.
Once Gateway receives Normal Request, it will send directly to the application.
And the response for that request will go through the Gateway before it is sent back to the client.

Signed Request indicates requests like `POST` and `PUT` which modifies the database.
It requires the user's signature.
This type of request is not directly sent to the application, but is sent via Chain Core.
Therefore, users have to wait for the Chain Core to include the Signed Request in the blockchain, to receive the response from the application.

### Memcached Protocol

In DApps development with Uniqys Kit, Easy Framework provides the database.
Easy Framework provides Memcached server to control the database from the application.
Applications are able to use pre-existing Memcache client libraries as we use in building conventional web applications.

### Outer API / Inner API

Outer API and Inner API are for managing accounts in the DApp, and it provides functions for checking transaction status and modifying account information.

Outer API is provided in Gateway, and it has APIs to check transaction status and account information.
Inner API has functions of Outer API, and in addition, it has functions to modify token balance.
Check [here](/easy-framework/api.md) for more details of usage.
